import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'drivers';

export default class Driver {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.slug = slug(this.name);
    this.mark = args.mark || false;
  }

  static getDrivers() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getDriver(id) {
    const driver = Driver.findById(id).value();
    if (driver) {
      return { driver, messages: [] };
    }
    return { driver: {}, messages: ['Водія не знайдено'] };
  }

  static createDriver(args) {
    db.read();

    const driverDb = db.get(TABLE).find({ name: args.name }).value();
    if (driverDb) {
      return { driver: {}, messages: ['Водій з таким іменем вже існує'] };
    }

    let driver = new Driver({ ...args });
    const messages = driver.validate();
    if (messages.length === 0) {
      driver = driver.toJSON();
      db.get(TABLE).push(driver).write();
      return { driver, messages };
    }
    return { driver: {}, messages };
  }

  static changeDriver(id, args) {
    const driverDb = Driver.findById(id);
    if (driverDb.value()) {
      const driver = new Driver({ ...args, id });
      const messages = driver.validate();
      if (messages.length === 0) {
        return {
          driver: driverDb.assign({ ...driver.toJSON() }).write(),
          messages,
        };
      }
      return { driver: {}, messages };
    }
    return { driver: {}, messages: ['Водія не знайдено'] };
  }

  static createDriverIfNotExist(arg) {
    if (!arg) {
      return '';
    }

    db.read();

    let driverDb = db.get(TABLE).find({ id: arg }).value();
    if (driverDb) {
      return driverDb.id;
    }

    driverDb = db.get(TABLE).find({ name: arg }).value();
    if (driverDb) {
      return driverDb.id;
    }

    let driver = new Driver({ name: arg });
    driver = driver.toJSON();
    db.get(TABLE).push(driver).write();
    return driver.id;
  }

  static removeDriver(id) {
    const messages = [];
    const driver = Driver.findById(id).value();
    if (!driver) {
      messages.push('Водія не знайдено');
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
