import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NomenclatureList from './NomenclatureList';
import OneNomenclature from './OneNomenclature';

const Nomenclature = () => (
  <Switch>
    <Route exact path="/nomenclature" component={NomenclatureList} />
    <Route path="/nomenclature/new" component={OneNomenclature} />
    <Route path="/nomenclature/:id" component={OneNomenclature} />
  </Switch>
);

export default Nomenclature;
