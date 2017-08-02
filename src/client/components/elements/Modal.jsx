import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  title = 'Dialog',
  id,
  children,
}) => {

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal"
    >
      <div
        className="modal-dialog modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              id="close-modal"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <h4 className="modal-title" id="modalLabel">{title}</h4>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;