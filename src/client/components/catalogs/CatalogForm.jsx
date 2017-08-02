import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { CSS_OBJECT_HEADER } from '../../constants';

const getData = (list, id) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
};

class CatalogForm extends Component {
  constructor(props) {
    super(props);

    const { id, blank } = this.props;

    this.params = {
      new: !id,
      reread: !!id,
      modified: false,
      data: blank,
    };

    this.updateParams = this.updateParams.bind(this);
    this.reread = this.reread.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.id);
  }

  updateParams() {
    const { id, blank, data } = this.props;
    if (data.length !== 0) { // fetched
      this.params.data = { ...getData(data, id) } || blank;
      this.params.reread = false;
    }
  }

  reread() {
    this.props.fetch(this.props.id);
    this.params.reread = true;
    this.params.modified = false;
    this.forceUpdate();
  }

  handleInputChange(e) {
    e.preventDefault();
    this.params.data = { ...this.params.data, [e.target.name]: e.target.value };
    this.params.modified = true;
    this.forceUpdate();
  }

  handleSave(close = false) {
    if (this.params.new) {
      const payload = {
        ...this.params.data,
        id: uuid(),
      };
      this.props.create(payload);
      this.props.history.replace(`${this.props.url}/${payload.id}`);
      this.params.new = false;
    } else {
      this.props.change(this.props.id, this.params.data);
    }

    if (close) {
      this.props.history.goBack();
    } else {
      this.params.modified = false;
    }
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  handleDelete(e) {
    e.preventDefault();
    if (!this.params.new) {
      this.props.delete(this.props.id);
      this.props.history.goBack();
    }
  }

  render() {
    if (this.params.reread && !this.params.new) {
      this.updateParams();
    }

    let elementToRender = 'Loading...';
    if (!this.params.reread) {
      const children = Children.map(
        this.props.children,
        child => React.cloneElement(child, {
          ...this.params.data,
          onChange: this.handleInputChange,
        }),
      );

      let subTitle = `${this.params.new ? 'новий' : ''}${this.params.new && this.params.modified ? ', ' : ''}${this.params.modified ? 'не збережено' : ''}`;
      if (subTitle) {
        subTitle = `(${subTitle})`;
      }

      const title = `${this.props.title} ${subTitle} - ${this.params.data.name}`;

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{title}</p>

          <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
            <div className="btn-group btn-group-sm pull-left" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleSave(true)}
              >
                Зберегти та закрити
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.handleSave()}
              >
                Зберегти
              </button>
            </div>

            <div className="btn-group btn-group-sm pull-left">
              <button
                type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Додатково
                <span className="caret" />
              </button>
              <ul className="dropdown-menu">
                <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={this.handleDelete}>Видалити</a></li>
                <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={this.reread}>Перечитати</a></li>
              </ul>
            </div>

            <div className="btn-group btn-group-sm pull-right">
              <button
                type="button"
                className="close"
                onClick={this.handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>

          {children}
        </div>
      );
    }

    return (
      <div>
        {elementToRender}
      </div>
    );
  }
}

CatalogForm.defaultProps = {
  id: '',
};

CatalogForm.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  blank: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,

  fetch: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default CatalogForm;
