import axios from 'axios';

import Auth from '../auth';

class LoadingBillsApi {
  constructor() {
    this.path = '/loadingBill';
  }

  async fetchLoadingBills() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createLoadingBill(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new LoadingBillsApi();
