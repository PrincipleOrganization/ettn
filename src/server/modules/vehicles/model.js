import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'vehicles';

export const Types = {
  TRUCK: 'truck',
  TRAILER: 'trailer',
  RAILCAR: 'railcar',
};

export default class Vehicle {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.slug = slug(this.name);
    this.mark = args.mark || false;
    this.type = args.type || Types.TRUCK;
  }

  static getVehicles() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getVehicle(id) {
    const vehicle = Vehicle.findById(id).value();
    if (vehicle) {
      return { vehicle, messages: [] };
    }
    return { vehicle: {}, messages: ['Транспортний засіб не знайдено'] };
  }

  static createVehicle(args) {
    db.read();

    const vehicleDb = db.get(TABLE).find({ name: args.name }).value();
    if (vehicleDb) {
      return { vehicle: {}, messages: ['Транспортний засіб з такою назваою вже існує'] };
    }

    let vehicle = new Vehicle({ ...args });
    const messages = vehicle.validate();
    if (messages.length === 0) {
      vehicle = vehicle.toJSON();
      db.get(TABLE).push(vehicle).write();
      return { vehicle, messages };
    }
    return { vehicle: {}, messages };
  }

  static createVehicleIfNotExist(arg, type = Types.TRUCK) {
    if (!arg) {
      return '';
    }

    db.read();

    let vehicleDb = db.get(TABLE).find({ id: arg }).value();
    if (vehicleDb) {
      return vehicleDb.id;
    }

    vehicleDb = db.get(TABLE).find({ name: arg }).value();
    if (vehicleDb) {
      return vehicleDb.id;
    }

    let vehicle = new Vehicle({ name: arg, type });
    vehicle = vehicle.toJSON();
    db.get(TABLE).push(vehicle).write();
    return vehicle.id;
  }

  static changeVehicle(id, args) {
    const vehicleDb = Vehicle.findById(id);
    let vehicle = vehicleDb.value();
    if (vehicle) {
      vehicle = new Vehicle({ ...args, id });
      const messages = vehicle.validate();
      if (messages.length === 0) {
        return {
          vehicle: vehicleDb.assign({ ...vehicle.toJSON() }).write(),
          messages,
        };
      }
      return { vehicle: {}, messages };
    }
    return { vehicle: {}, messages: ['Транспортний засіб не знайдено'] };
  }

  static removeVehicle(id) {
    const messages = [];
    const vehicle = Vehicle.findById(id).value();
    if (!vehicle) {
      messages.push('Транспортний засіб не знайдено');
    }
    return {
      success: db.get(TABLE).remove({ id }).write().length === 1,
      messages,
    };
  }

  validate() {
    const messages = [];
    if (!this.name) {
      messages.push('Не вказано назву!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
