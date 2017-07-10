import axios from 'axios';

import Auth from '../auth';

class ClientsApi {
  constructor() {
    this.path = '/client';
  }

  async fetchClients() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createClient(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new ClientsApi();
