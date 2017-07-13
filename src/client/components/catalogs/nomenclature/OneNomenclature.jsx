import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchOneNomenclature, createNomenclature, changeNomenclature, deleteNomenclature } from '../../../actions/nomenclature';

import CatalogForm from '../CatalogForm';

const NomenclatureForm = props => (
  <form>
    <div className="form-group">
      <label htmlFor="name">Назва</label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Назва"
        name="name"
        value={props.name}
        onChange={props.onChange}
      />
    </div>
  </form>
);

NomenclatureForm.defaultProps = {
  name: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

NomenclatureForm.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

const Nomenclature = props => (
  <CatalogForm
    title="Номенклатура"
    id={props.match.params.id}
    blank={{ name: '' }}
    data={props.nomenclature.data}
    history={props.history}
    url="/nomenclature"
    fetch={props.fetchOneNomenclature}
    create={props.createNomenclature}
    change={props.changeNomenclature}
    delete={props.deleteNomenclature}
  >
    <NomenclatureForm />
  </CatalogForm>
);

Nomenclature.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  nomenclature: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,

  fetchOneNomenclature: PropTypes.func.isRequired,
  createNomenclature: PropTypes.func.isRequired,
  changeNomenclature: PropTypes.func.isRequired,
  deleteNomenclature: PropTypes.func.isRequired,
};

export default connect(state => ({
  nomenclature: state.nomenclature,
}), {
  fetchOneNomenclature,
  createNomenclature,
  changeNomenclature,
  deleteNomenclature,
})(Nomenclature);
