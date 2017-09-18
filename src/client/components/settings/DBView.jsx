import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';

import { Spinner, Icon } from '../elements';
import { CSS_OBJECT_HEADER } from '../../constants';
import { Db } from '../../utils';

class DBView extends Component {
  constructor(props) {
    super(props);

    this.baseUrl = '/settings';

    this.state = { db: {}, text: '', fetching: false };

    this.handleGetDb = this.handleGetDb.bind(this);
    this.handleSetDb = this.handleSetDb.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderTextarea = this.renderTextarea.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  async handleGetDb() {
    this.setState({ db: {}, fetching: true });
    const db = await Db.fetchDb();
    this.setState({ db, fetching: false });
  }

  async handleSetDb() {
    this.setState({ fetching: true });
    const db = await Db.changeDb(JSON.parse(this.state.text));
    this.setState({ db, fetching: false });
  }

  handleTextarea(e) {
    this.setState({ text: e.target.value });
  }

  renderToolbar() {
    return (
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={this.handleGetDb}
        >
          <Icon.GetDB />
          Отримати базу даних
        </button>
        <button
          type="button"
          className="btn btn-sm btn-default"
          onClick={this.handleSetDb}
        >
          <Icon.SetDB />
          Змінити базу даних
        </button>
      </div>
    );
  }

  renderView() {
    return (
      <div className="db-viewer">
        <ReactJson src={this.state.db} />
      </div>
    );
  }

  renderTextarea() {
    return (
      <div>
        <textarea
          className="form-control"
          rows="30"
          value={this.state.text}
          onChange={this.handleTextarea}
        />
      </div>
    );
  }

  render() {
    let elementsToRender = <Spinner />;
    if (!this.state.fetching) {
      elementsToRender = (
        <div className="db-setting">
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a data-toggle="tab" href="#tab-default">Перегляд</a></li>
            <li role="presentation"><a data-toggle="tab" href="#tab-goods">Зміна</a></li>
          </ul>

          <div className="form-tab-content">
            <div className="tab-content">
              <div id="tab-default" className="tab-pane fade in active">
                {this.renderView()}
              </div>
              <div id="tab-goods" className="tab-pane fade">
                {this.renderTextarea()}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className={CSS_OBJECT_HEADER}>
          <Link to={this.baseUrl}>Налаштування</Link> / База даних
        </p>
        {this.renderToolbar()}
        {elementsToRender}
      </div>
    );
  }
}

export default DBView;