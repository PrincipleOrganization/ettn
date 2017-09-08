import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'nomenclature';

export default class Nomenclature {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.slug = slug(this.name);
    this.mark = args.mark || false;
  }

  static getNomenclature() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getOneNomenclature(id) {
    const nomenclature = Nomenclature.findById(id).value();
    if (nomenclature) {
      return { nomenclature, messages: [] };
    }
    return { nomenclature: {}, messages: ['Номенклатуру не знайдено'] };
  }

  static createNomenclature(args) {
    db.read();

    const nomenclatureDb = db.get(TABLE).find({ name: args.name }).value();
    if (nomenclatureDb) {
      return { nomenclature: {}, messages: ['Номенклатура з таким іменем вже існує'] };
    }

    let nomenclature = new Nomenclature({ ...args });
    const messages = nomenclature.validate();
    if (messages.length === 0) {
      nomenclature = nomenclature.toJSON();
      db.get(TABLE).push(nomenclature).write();
      return { nomenclature, messages };
    }
    return { nomenclature: {}, messages };
  }

  static createNomenclatureIfNotExist(arg) {
    db.read();

    if (!arg) {
      return null;
    }

    let nomenclatureDb = db.get(TABLE).find({ id: arg }).value();
    if (nomenclatureDb) {
      return nomenclatureDb.id;
    }

    nomenclatureDb = db.get(TABLE).find({ name: arg }).value();
    if (nomenclatureDb) {
      return nomenclatureDb.id;
    }

    let nomenclature = new Nomenclature({ name: arg });
    nomenclature = nomenclature.toJSON();
    db.get(TABLE).push(nomenclature).write();
    return nomenclature.id;
  }

  static changeNomenclature(id, args) {
    const nomenclatureDb = Nomenclature.findById(id);
    if (nomenclatureDb.value()) {
      const nomenclature = new Nomenclature({ ...args, id });
      const messages = nomenclature.validate();
      if (messages.length === 0) {
        return {
          nomenclature: nomenclatureDb.assign({ ...nomenclature.toJSON() }).write(),
          messages,
        };
      }
      return { nomenclature: {}, messages };
    }
    return { nomenclature: {}, messages: ['Номенклатуру не знайдено'] };
  }

  static removeNomenclature(id) {
    const messages = [];
    const nomenclature = Nomenclature.findById(id).value();
    if (!nomenclature) {
      messages.push('Номенклатуру не знайдено');
    }
    return {
      success: db.get(TABLE).remove({ id }).write().length === 1,
      messages,
    };
  }

  validate() {
    const messages = [];
    if (!this.name) {
      messages.push('Не вказана назва!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
