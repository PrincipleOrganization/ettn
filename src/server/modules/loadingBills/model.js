import uuid from 'uuid';
import slug from 'slug';
import moment from 'moment';

import { database } from '../../config';

const db = database();

const TABLE = 'loadingBills';

export default class LoadingBill {
  constructor(args) {
    const date = moment().toDate();

    this.id = args.id || uuid();
    this.number = args.number || LoadingBill.generateNumber();
    this.createdAt = args.createdAt || date;
    this.changedAt = date;
    this.verified = args.verified || false;
    this.slug = slug(`${this.number} from ${this.createdAt}`);
    this.mark = args.mark || false;
    this.vehicle = args.vehicle;
    this.trailer = args.trailer || '';
    this.driver = args.driver;
    this.carrier = args.carrier;
    this.customer = args.customer;
    this.sender = args.sender;
    this.recipient = args.recipient;
    this.shippingPoint = args.shippingPoint;
    this.gross = args.gross || 0;
    this.tara = args.tara || 0;
    this.net = args.net || 0;
    this.grossDate = args.grossDate || '';
    this.taraDate = args.taraDate || '';
    this.netDate = args.netDate || '';
    this.goods = args.goods;
    this.author = args.author;
  }

  static getLoadingBills() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static createLoadingBill(args) {
    db.read();

    const loadingBillDb = db.get(TABLE).find({ name: args.name }).value();
    if (loadingBillDb) {
      return { loadingBill: {}, messages: ['Loading bill with this name exists'] };
    }

    let loadingBill = new LoadingBill({ ...args, number: '', createdAt: '', verified: false });
    loadingBill = loadingBill.toJSON();
    db.get(TABLE).push(loadingBill).write();
    return { loadingBill, messages: [] };
  }

  static changeLoadingBill(id, args) {
    let messages = [];
    const loadingBillDb = LoadingBill.findById(id);
    const loadingBillDbValue = loadingBillDb.value();
    if (loadingBillDbValue) {
      const { createdAt, number, author } = loadingBillDbValue;
      const loadingBill = new LoadingBill({
        ...loadingBillDbValue,
        ...args,
        id,
        createdAt,
        number,
        author,
      });
      if (loadingBill.verified) {
        messages = loadingBill.validate();
      }
      if (messages.length === 0) {
        return {
          loadingBill: loadingBillDb.assign({ ...loadingBill.toJSON() }).write(),
          messages,
        };
      }
      return { loadingBill: {}, messages };
    }
    return { loadingBill: {}, messages: ['No such loading bill with this id'] };
  }

  static removeLoadingBill(id) {
    const messages = [];
    const loadingBill = LoadingBill.findById(id).value();
    if (!loadingBill) {
      messages.push('No such loading bill with this id');
    }
    return {
      secusses: db.get(TABLE).remove({ id }).write().length === 1,
      messages,
    };
  }

  static generateNumber() {
    let maxNumber = 1;
    const loadingBills = LoadingBill.getLoadingBills();
    for (let i = 0; i < loadingBills.length; i += 1) {
      const number = Number(loadingBills[i].number);
      if (number >= maxNumber) {
        maxNumber = number + 1;
      }
    }
    if (maxNumber >= 999999) {
      maxNumber = 1;
    }
    return maxNumber.toString();
  }

  validate() {
    const messages = [];
    if (!this.vehicle) {
      messages.push('Vehicle is required!');
    }
    if (!this.driver) {
      messages.push('Driver is required!');
    }
    if (!this.carrier) {
      messages.push('Carrier is required!');
    }
    if (!this.customer) {
      messages.push('Customer is required!');
    }
    if (!this.sender) {
      messages.push('Sender is required!');
    }
    if (!this.recipient) {
      messages.push('Recipient is required!');
    }
    if (!this.shippingPoint) {
      messages.push('Shipping point is required!');
    }
    if (!this.shippingPoint) {
      messages.push('Shipping point is required!');
    }
    if (!this.shippingPoint) {
      messages.push('Shipping point is required!');
    }
    if (!this.shippingPoint) {
      messages.push('Shipping point is required!');
    }
    if (this.goods.length === 0) {
      messages.push('Goods is required!');
    } else {
      for (let i = 0; i < this.goods.length; i += 1) {
        const good = this.goods[i];
        if (!good.nomenclature) {
          messages.push(`Nomenclature in string #${i} is required!`);
        }
        if (!good.quantity) {
          messages.push(`Quantity of nomenclature in string #${i} is required!`);
        }
      }
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
