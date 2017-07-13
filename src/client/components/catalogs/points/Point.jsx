import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPoint, createPoint, changePoint, deletePoint } from '../../../actions/points';

import CatalogForm from '../CatalogForm';

const PointForm = props => (
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

PointForm.defaultProps = {
  name: '',
  onChange: (e) => {
    e.preventDefault();
  },
};

PointForm.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

const Point = props => (
  <CatalogForm
    title="Пункт"
    id={props.match.params.id}
    blank={{ name: '' }}
    data={props.points.data}
    history={props.history}
    url="/points"
    fetch={props.fetchPoint}
    create={props.createPoint}
    change={props.changePoint}
    delete={props.deletePoint}
  >
    <PointForm />
  </CatalogForm>
);

Point.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  points: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,

  fetchPoint: PropTypes.func.isRequired,
  createPoint: PropTypes.func.isRequired,
  changePoint: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
};

export default connect(state => ({
  points: state.points,
}), { fetchPoint, createPoint, changePoint, deletePoint })(Point);
