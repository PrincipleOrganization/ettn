import React from 'react';

const catalogs = [
  'drivers',
  'vehicles',
  'clients',
  'points',
  'nomenclature',
];

const Catalogs = () => (
  <div>
    { catalogs.map(catalog => (
      <div key={catalogs.indexOf(catalog)}>
        <p>{catalog}</p>
      </div>
    )) }
  </div>
);

export default Catalogs;
