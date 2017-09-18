import axios from 'axios';

import Auth from '../auth';

class ClientsApi {
  constructor() {
    this.path = '/db';
  }

  async fetchDb() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async changeDb(payload) {
    const { data } = await axios({
      method: 'put',
      url: this.path,
      data: payload,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }
}

export default new ClientsApi();
