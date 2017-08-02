import slug from 'slug';
import uuid from 'uuid';

import { database } from '../../config';

const db = database();

const TABLE = 'scales';

class Scale {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.baseUrl = args.baseUrl;
    this.url = args.url;
    this.socketUrl = args.socketUrl;
    this.apiVersion = args.apiVersion || '2.0';
    this.slug = slug(this.name);
    this.mark = args.mark || false;
  }

  static getScales() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getScale(id) {
    const scale = Scale.findById(id).value();
    if (scale) {
      return { scale, messages: [] };
    }
    return { scale: {}, messages: ['No such scale with this id'] };
  }

  static createScale(args) {
    db.read();

    const scaleDb = db.get(TABLE).find({ name: args.name }).value();
    if (scaleDb) {
      return { scale: {}, messages: ['Scale with this name exists'] };
    }

    let scale = new Scale({ ...args });
    const messages = scale.validate();
    if (messages.length === 0) {
      scale = scale.toJSON();
      db.get(TABLE).push(scale).write();
      return { scale, messages };
    }
    return { scale: {}, messages };
  }

  static changeScale(id, args) {
    const scaleDb = Scale.findById(id);
    if (scaleDb.value()) {
      const scale = new Scale({ ...args, id });
      const messages = scale.validate();
      if (messages.length === 0) {
        return {
          scale: scaleDb.assign({ ...scale.toJSON() }).write(),
          messages,
        };
      }
      return { scale: {}, messages };
    }
    return { scale: {}, messages: ['No such scale with this id'] };
  }

  static removeScale(id) {
    const messages = [];
    const scale = Scale.findById(id).value();
    if (!scale) {
      messages.push('No such scale with this id');
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
    if (!this.baseUrl) {
      messages.push('Base Url is required!');
    }
    if (!this.url) {
      messages.push('Url is required!');
    }
    if (!this.socketUrl) {
      messages.push('Socket Url is required!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}

export default Scale;
