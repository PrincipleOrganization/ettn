import axios from 'axios';

import Auth from '../auth';

class PointsApi {
  constructor() {
    this.path = '/point';
  }

  async fetchPoints() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createPoint(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new PointsApi();
