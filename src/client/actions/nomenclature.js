import { NomenclatureApi } from '../utils';

export const FETCH_NOMENCLATURE = 'FETCH_NOMENCLATURE';
export const FETCH_NOMENCLATURE_ERROR = 'FETCH_NOMENCLATURE_ERROR';
export const FETCH_NOMENCLATURE_SUCCESS = 'FETCH_NOMENCLATURE_SUCCESS';

export const fetchNomenclature = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.fetchNomenclature();
      return dispatch({ type: FETCH_NOMENCLATURE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_NOMENCLATURE_ERROR,
        e,
      });
    }
  }
);
