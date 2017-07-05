import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'vehicles';

const Types = {
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

  static createVehicle(args) {
    db.read();

    const vehicleDb = db.get(TABLE).find({ name: args.name }).value();
    if (vehicleDb) {
      return { vehicle: {}, messages: ['Vehicle with this name exists'] };
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

  static changeVehicle(id, args) {
    const vehicleDb = Vehicle.findById(id);
    if (vehicleDb.value()) {
      const vehicle = new Vehicle({ ...args, id });
      const messages = vehicle.validate();
      if (messages.length === 0) {
        return {
          vehicle: vehicleDb.assign({ ...vehicle.toJSON() }).write(),
          messages,
        };
      }
      return { vehicle: {}, messages };
    }
    return { vehicle: {}, messages: ['No such vehicle with this id'] };
  }

  static removeVehicle(id) {
    const messages = [];
    const vehicle = Vehicle.findById(id).value();
    if (!vehicle) {
      messages.push('No such vehicle with this id');
    }
    return {
      secusses: db.get(TABLE).remove({ id }).write().length === 1,
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
