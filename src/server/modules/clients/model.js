import uuid from 'uuid';
import slug from 'slug';

import { database } from '../../config';

const db = database();

const TABLE = 'clients';

export default class Client {
  constructor(args) {
    this.id = args.id || uuid();
    this.name = args.name;
    this.edrpou = args.edrpou;
    this.slug = slug(this.name);
    this.mark = args.mark || false;
  }

  static getClients() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static createClient(args) {
    db.read();

    const clientDb = db.get(TABLE).find({ name: args.name }).value();
    if (clientDb) {
      return { client: {}, messages: ['Client with this name exists'] };
    }

    let client = new Client({ ...args });
    const messages = client.validate();
    if (messages.length === 0) {
      client = client.toJSON();
      db.get(TABLE).push(client).write();
      return { client, messages };
    }
    return { client: {}, messages };
  }

  static changeClient(id, args) {
    const clientDb = Client.findById(id);
    if (clientDb.value()) {
      const client = new Client({ ...args, id });
      const messages = client.validate();
      if (messages.length === 0) {
        return {
          client: clientDb.assign({ ...client.toJSON() }).write(),
          messages,
        };
      }
      return { client: {}, messages };
    }
    return { client: {}, messages: ['No such client with this id'] };
  }

  static removeClient(id) {
    const messages = [];
    const client = Client.findById(id).value();
    if (!client) {
      messages.push('No such client with this id');
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
    if (!this.edrpou) {
      messages.push('EDRPOU code is required!');
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
