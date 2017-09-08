import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchNomenclature, changeNomenclature } from '../../../actions/nomenclature';

import CatalogList from '../CatalogList';

const NomenclatureList = (props) => {
  const { data, isFetched } = props.nomenclature;
  return (
    <div>
      <CatalogList
        title="Номенклатура"
        data={data}
        url="/nomenclature"
        isFetched={isFetched}
        history={props.history}
        fetch={props.fetchNomenclature}
        change={props.changeNomenclature}
      />
    </div>
  );
};

NomenclatureList.propTypes = {
  nomenclature: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,

  fetchNomenclature: PropTypes.func.isRequired,
  changeNomenclature: PropTypes.func.isRequired,
};

export default connect(state => ({
  nomenclature: state.nomenclature,
}), { fetchNomenclature, changeNomenclature })(NomenclatureList);
