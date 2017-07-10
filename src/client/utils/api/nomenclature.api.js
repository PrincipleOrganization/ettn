import axios from 'axios';

import Auth from '../auth';

class NomenclatureApi {
  constructor() {
    this.path = '/nomenclature';
  }

  async fetchNomenclature() {
    const { data } = await axios({
      method: 'get',
      url: this.path,
      headers: { authorization: Auth.getToken() },
    });
    return data;
  }

  async createNomenclature(payload) {
    const { data } = await axios.post(this.path, payload);
    return data;
  }
}

export default new NomenclatureApi();
