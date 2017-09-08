import React from 'react';
import PropTypes from 'prop-types';

const ListToolbar = ({ mainButtons, secondaryButtons, specialButtons, components }) => {
  return (
    <div className="table-toolbar row clearfix">
      <div className="col-xs-12 col-sm-12 col-md-8 pull-left">
        <div className="btn-toolbar object-toolbar" role="toolbar">
          {mainButtons}
          {secondaryButtons}
          {specialButtons}
        </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-4 pull-right">
        {components.searchPanel}
      </div>
    </div>
  );
};

ListToolbar.defaultProps = {
  secondaryButtons: null,
  specialButtons: null,
  components: {},
};

ListToolbar.propTypes = {
  mainButtons: PropTypes.node.isRequired,
  secondaryButtons: PropTypes.node,
  specialButtons: PropTypes.node,
  components: PropTypes.shape({}),
};

export default ListToolbar;
