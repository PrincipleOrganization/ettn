import axios from 'axios';

import Auth from '../auth';

class VehiclesApi {
  constructor() {
    this.path = '/vehicle';
  }

  async fetchVehicles() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createVehicle(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new VehiclesApi();
