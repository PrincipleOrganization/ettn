import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

import { fetchNomenclature } from '../../../actions/nomenclature';

const NomenclatureSelect = props => (
  <div>
    <CatalogSelectModal
      title="Номенклатура"
      id={props.id}
      name={props.name}
      data={props.nomenclature.data}
      isFetched={props.nomenclature.isFetched}
      fetch={props.fetchNomenclature}  
      select={props.select}
    />
  </div>
);

NomenclatureSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nomenclature: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchNomenclature: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  nomenclature: state.nomenclature,
}), { fetchNomenclature })(NomenclatureSelect);
