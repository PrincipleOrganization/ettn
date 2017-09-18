import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CatalogSelectModal from '../CatalogSelectModal';

const NomenclatureSelect = props => (
  <div>
    <CatalogSelectModal
      title="Номенклатура"
      id={props.id}
      name={props.name}
      data={props.nomenclature.data}
      isFetched={props.nomenclature.isFetched}
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
  select: PropTypes.func.isRequired,
};

export default connect(state => ({
  nomenclature: state.nomenclature,
}))(NomenclatureSelect);
