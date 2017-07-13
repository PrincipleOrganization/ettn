import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'points';

export default class Point {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.slug = slug(this.name);
    this.mark = args.mark || false;
  }

  static getPoints() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getPoint(id) {
    const point = Point.findById(id).value();
    if (point) {
      return { point, messages: [] };
    }
    return { point: {}, messages: ['No such point with this id'] };
  }

  static createPoint(args) {
    db.read();

    const pointDb = db.get(TABLE).find({ name: args.name }).value();
    if (pointDb) {
      return { point: {}, messages: ['Point with this name exists'] };
    }

    let point = new Point({ ...args });
    const messages = point.validate();
    if (messages.length === 0) {
      point = point.toJSON();
      db.get(TABLE).push(point).write();
      return { point, messages };
    }
    return { point: {}, messages };
  }

  static changePoint(id, args) {
    const pointDb = Point.findById(id);
    if (pointDb.value()) {
      const point = new Point({ ...args, id });
      const messages = point.validate();
      if (messages.length === 0) {
        return {
          point: pointDb.assign({ ...point.toJSON() }).write(),
          messages,
        };
      }
      return { point: {}, messages };
    }
    return { point: {}, messages: ['No such point with this id'] };
  }

  static removePoint(id) {
    const messages = [];
    const point = Point.findById(id).value();
    if (!point) {
      messages.push('No such point with this id');
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
