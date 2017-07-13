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
    return { nomenclature: {}, messages: ['No such nomenclature with this id'] };
  }

  static createNomenclature(args) {
    db.read();

    const nomenclatureDb = db.get(TABLE).find({ name: args.name }).value();
    if (nomenclatureDb) {
      return { nomenclature: {}, messages: ['Nomenclature with this name exists'] };
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
    return { nomenclature: {}, messages: ['No such nomenclature with this id'] };
  }

  static removeNomenclature(id) {
    const messages = [];
    const nomenclature = Nomenclature.findById(id).value();
    if (!nomenclature) {
      messages.push('No such nomenclature with this id');
    }
    return {
      success: db.get(TABLE).remove({ id }).write().length === 1,
      messages,
    };
  }

  validate() {
    const messages = [];
    if (!this.name) {
      messages.push('Name is required!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
