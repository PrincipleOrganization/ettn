import React from 'react';
import PropTypes from 'prop-types';
import Workbook from 'react-excel-workbook';

import { Icon } from '../elements';

const ExcelConverter = ({ data, columns, name, filename, buttonClass }) => {
  const excelColumns = columns.map(col => (
    <Workbook.Column key={columns.indexOf(col)} label={col.name} value={col.key} />
  ));

  const button = (
    <button
      className={`btn btn-sm btn-default ${buttonClass}`}
    >
      <Icon.ExportAsExcel />
      Експорт
    </button>
  );

  return (
    <Workbook filename={filename} element={button}>
      <Workbook.Sheet data={data} name={name}>
        {excelColumns}
      </Workbook.Sheet>
    </Workbook>
  );
};

ExcelConverter.defaultProps = {
  filename: 'report.xlsx',
  buttonClass: '',
};

ExcelConverter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,
  filename: PropTypes.string,
  buttonClass: PropTypes.string,
};

export default ExcelConverter;