import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { CSS_OBJECT_HEADER } from '../../constants';

import { Icon, Spinner } from '../elements';
import { dialog } from '../../utils';
import { deleteDialog } from './methods';

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
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    if (!this.params.new) {
      this.props.fetch(this.props.id);
    }
  }

  goBack() {
    this.props.history.push(this.props.url);
  }

  updateParams() {
    const { id, blank, data, isFetched } = this.props;
    if (isFetched) { // fetched
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

  async handleSave(close = false) {
    if (this.params.new) {
      const payload = {
        ...this.params.data,
        id: uuid(),
      };
      await this.props.create(payload);
      if (this.props.e.length === 0) {
        this.props.history.replace(`${this.props.url}/${payload.id}`);
        this.params.new = false;
      } else {
        return;
      }
    } else {
      await this.props.change(this.props.id, this.params.data);
    }

    if (close) {
      this.props.history.goBack();
    } else {
      this.params.modified = false;
      this.forceUpdate();
    }
  }

  handleClose() {
    if (this.params.modified) {
      dialog.showOnCloseDialog(this.goBack);
    } else {
      this.goBack();
    }
  }

  async handleDelete() {
    if (!this.params.new) {
      this.params.data.mark = !this.params.data.mark;
      await this.handleSave();
    }
  }

  render() {
    const haveErrors = dialog.showError(this.props.m, this.goBack);

    if (this.params.reread && !this.params.new) {
      this.updateParams();
    }

    let elementToRender = <Spinner />;
    if (!this.params.reread && !haveErrors && (this.props.isFetched || this.params.new)) {
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
      let icon = null;
      if (this.params.data.mark) {
        icon = <Icon.MarkToRemove />;
      }

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{icon} {title}</p>

          <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
            <div className="btn-group btn-group-sm pull-left" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleSave(true)}
              >
                <Icon.SaveClose />
                Зберегти та закрити
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.handleSave()}
              >
                <Icon.Save />
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
                <li>
                  <a
                    role="button"
                    className={this.params.new ? 'disabled' : ''}
                    onClick={() => { deleteDialog(this, this.params.data.mark, false) }}
                  >
                    <Icon.Remove />
                    Видалити
                  </a>
                </li>
                <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={this.reread}><Icon.Refresh />Перечитати</a></li>
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
  m: [],
  e: [],
};

CatalogForm.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  blank: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetched: PropTypes.bool.isRequired,
  m: PropTypes.arrayOf(PropTypes.string),
  e: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,

  fetch: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default CatalogForm;
