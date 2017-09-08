import React from 'react';
import PropTypes from 'prop-types';

import ClientsSelect from '../catalogs/clients/ClientsSelect';
import DriversSelect from '../catalogs/drivers/DriversSelect';
import VehiclesSelect from '../catalogs/vehicles/VehiclesSelect';
import PointsSelect from '../catalogs/points/PointsSelect';
import NomenclatureSelect from '../catalogs/nomenclature/NomenclatureSelect';
import ScalesSelect from '../catalogs/scales/ScalesSelect';
import UsersSelect from '../catalogs/users/UsersSelect';

const selectors = {
  catalogs: {
    clients: ClientsSelect,
    drivers: DriversSelect,
    vehicles: VehiclesSelect,
    vehiclesSecondary: VehiclesSelect,
    points: PointsSelect,
    nomenclature: NomenclatureSelect,
    users: UsersSelect,
    scales: ScalesSelect,
  },
};

const ModalSelect = ({
  selector,
  table,
  id,
  name,
  select,
}) => {
  const ElementToRender = selectors[selector][table];
  let element = <ElementToRender id={id} name={name} select={select} />;
  if (selector === 'catalogs' && table === 'vehiclesSecondary') {
    element = <ElementToRender id={id} name={name} select={select} secondary />;
  }
  return (
    <div>
      {element}
    </div>
  );
};

ModalSelect.propTypes = {
  selector: PropTypes.string.isRequired,
  table: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
};

export default ModalSelect;
