import React from 'react';
import PropTypes from 'prop-types';

const CatalogList = (props) => {
  const rowOnClick = props.rowOnClick;

  let elementToRender = 'Loading...';

  if (props.isFetched) {
    elementToRender = (
      <div>
        { props.data.map(item => (
          <div key={item.id} onClick={() => rowOnClick(item.id)}>
            <p>{ item[props.cols[0]] }</p>
          </div>
        )) }
      </div>
    );
  }

  return (
    <div>
      { elementToRender }
    </div>
  );
};

CatalogList.defaultProps = {
  cols: ['id', 'name'],
};

CatalogList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetched: PropTypes.bool.isRequired,
  cols: PropTypes.arrayOf(PropTypes.string),
  rowOnClick: PropTypes.func.isRequired,
};

export default CatalogList;
