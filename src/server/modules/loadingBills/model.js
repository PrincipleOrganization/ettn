import uuid from 'uuid';
import slug from 'slug';
import moment from 'moment';

import { database } from '../../config';

import Clients from '../clients/model';
import Drivers from '../drivers/model';
import Nomeclature from '../nomenclature/model';
import Points from '../points/model';
import Vehicles, { Types as VehiclesTypes } from '../vehicles/model';

const db = database();

const TABLE = 'loadingBills';

const Types = {
  INCOME: 'income',
  OUTCOME: 'outcome',
};

export default class LoadingBill {
  constructor(args) {
    const date = moment().toDate();

    this.id = args.id || uuid();
    this.number = args.number || LoadingBill.generateNumber();
    this.createdAt = args.createdAt || date;
    this.changedAt = date;
    this.type = args.type || Types.INCOME;
    this.verified = args.verified || false;
    this.slug = slug(`${this.number} from ${this.createdAt}`);
    this.mark = args.mark || false;
    this.vehicle = Vehicles.createVehicleIfNotExist(args.vehicle);
    this.trailer = Vehicles.createVehicleIfNotExist(args.trailer, VehiclesTypes.TRAILER);
    this.driver = Drivers.createDriverIfNotExist(args.driver);
    this.carrier = Clients.createClientIfNotExist(args.carrier);
    this.customer = Clients.createClientIfNotExist(args.customer);
    this.sender = Clients.createClientIfNotExist(args.sender);
    this.recipient = Clients.createClientIfNotExist(args.recipient);
    this.shippingPoint = Points.createPointIfNotExist(args.shippingPoint);
    this.grossScale = args.grossScale;
    this.taraScale = args.taraScale;
    this.grossOperator = args.grossOperator;
    this.taraOperator = args.taraOperator;
    this.netOperator = args.netOperator;
    this.gross = args.gross || 0;
    this.tara = args.tara || 0;
    this.net = args.net || 0;
    this.grossDate = args.grossDate || '';
    this.taraDate = args.taraDate || '';
    this.netDate = args.netDate || '';
    this.goods = args.goods;
    this.author = args.author;
    this.comment = args.comment || '';

    this.handleNomeclature();
  }

  static getLoadingBills() {
    db.read();
    return db.get(TABLE).value();
  }

  static findById(id) {
    db.read();
    return db.get(TABLE).find({ id });
  }

  static getLoadingBill(id) {
    const loadingBill = LoadingBill.findById(id).value();
    if (loadingBill) {
      return { loadingBill, messages: [] };
    }
    return { loadingBill: {}, messages: ['Товарно-транспортна накладна не знайдена'] };
  }

  static createLoadingBill(args) {
    db.read();

    const loadingBillDb = db.get(TABLE).find({ number: args.number }).value();
    if (loadingBillDb) {
      return { loadingBill: {}, messages: ['Товарно-транспортна накладна з таким номером існує'] };
    }

    let loadingBill = new LoadingBill({ ...args, number: '', createdAt: '', verified: false });
    loadingBill = loadingBill.toJSON();
    db.get(TABLE).push(loadingBill).write();
    return { loadingBill, messages: [] };
  }

  static changeLoadingBill(id, args) {
    let messages = [];
    const loadingBillDbValue = LoadingBill.findById(id).value();
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
          loadingBill: db.get(TABLE).find({ id }).assign({ ...loadingBill.toJSON() }).write(),
          messages,
        };
      }
      return { loadingBill: {}, messages };
    }
    return { loadingBill: {}, messages: ['Товарно-транспортна накладна не знайдена'] };
  }

  static removeLoadingBill(id) {
    const messages = [];
    const loadingBill = LoadingBill.findById(id).value();
    if (!loadingBill) {
      messages.push('Товарно-транспортна накладна не знайдена');
    }
    return {
      success: db.get(TABLE).remove({ id }).write().length === 1,
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

  handleNomeclature() {
    for (let i = 0; i < this.goods.length; i += 1) {
      const nomenclature = this.goods[i].nomenclature;
      this.goods[i].nomenclature = Nomeclature.createNomenclatureIfNotExist(nomenclature);
    }
  }

  validate() {
    const messages = [];
    if (!this.vehicle) {
      messages.push('Не вказано транспортний засіб!');
    }
    if (!this.driver) {
      messages.push('Не вказано водія!');
    }
    if (!this.carrier) {
      messages.push('Не вказано перевізника!');
    }
    if (!this.customer) {
      messages.push('Не вказано замовника!');
    }
    if (!this.sender) {
      messages.push('Не вказано відправника!');
    }
    if (!this.recipient) {
      messages.push('Не вказано отримувача!');
    }
    if (!this.shippingPoint) {
      messages.push('Не вказано пункт завантаження!');
    }
    if (!this.author) {
      messages.push('Не вказано автора!');
    }
    if (this.goods.length === 0) {
      messages.push('Не вказано товари!');
    } else {
      for (let i = 0; i < this.goods.length; i += 1) {
        const good = this.goods[i];
        if (!good.nomenclature) {
          messages.push(`Не вказано номенклатуру в стрічці ${i + 1}!`);
        }
        if (!good.quantity) {
          messages.push(`Не вказано кількість в стрічці ${i + 1}!`);
        }
      }
    }
    return messages;
  }

  toJSON() {
    return { ...this };
  }
}
