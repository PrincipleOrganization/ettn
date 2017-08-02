import React from 'react';
import PropTypes from 'prop-types';

import { CSS_TABLE_CLASS } from '../../constants';

import Field from './Field';

const FormTableToolbar = ({
  addRow,
  removeRow,
  activeRow,
}) => (
  <div className="btn-toolbar object-toolbar" role="toolbar">
    <div className="btn-group btn-group-sm" role="group">
      <button
        type="button"
        className="btn btn-primary"
        onClick={addRow}
      >
        Добавити
      </button>
      <button
        type="button"
        className={`btn btn-default ${activeRow ? '' : 'disabled'}`}
        onClick={removeRow}
      >
        Видалити
      </button>
    </div>
  </div>
);

FormTableToolbar.defaultProps = {
  activeRow: null,
};

FormTableToolbar.propTypes = {
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  activeRow: PropTypes.number,
};

const FormTable = ({
  cols,
  data,
  activeRow = null,
  addRow,
  removeRow,
  onRowClick,
  onChange,
}) => {
  const header = (
    <thead>
      <tr>
      <th className="table-col-number">#</th>
        {cols.map(col => (
          <th key={cols.indexOf(col)}>{col.title}</th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {data.map((item) => {
        const currentIndex = data.indexOf(item);
        return (
          <tr
            key={currentIndex}
            onClick={() => onRowClick(currentIndex)}
          >
            <td className="table-col-number">
              {item['number']}  
            </td>
            {cols.map((col) => {
              const selectButton = !!(col.selector);
              if (activeRow === currentIndex) {
                return (
                  <td key={cols.indexOf(col)} className="td-form-table active">
                    <Field
                      name={col.iter}
                      id={col.iter}
                      type={'text'}
                      placeholder={col.title}
                      value={item[col.iter]}
                      width={12}
                      withLabel={false}
                      selectButton={selectButton}
                      selector={col.selector}
                      table={col.table}
                      onChange={onChange}
                    />
                  </td>
                );
              }
              return (<td key={cols.indexOf(col)}>{item[col.iter]}</td>);
            })}
          </tr>
        );
      })}
    </tbody>
  );

  return (<div>
    <FormTableToolbar
      addRow={addRow}
      removeRow={removeRow}
      activeRow={activeRow}
    />

    <table className={CSS_TABLE_CLASS}>
      {header}
      {body}
    </table>
  </div>)
};
FormTable.defaultProps = {
  activeRow: null,
};

FormTable.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeRow: PropTypes.number,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTable;