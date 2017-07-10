import axios from 'axios';

import Auth from '../auth';

class DriversApi {
  constructor() {
    this.path = '/driver';
  }

  async fetchDrivers() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createDriver(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new DriversApi();
