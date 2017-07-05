import Vehicle from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Vehicle.getVehicles());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Vehicle.createVehicle(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Vehicle.changeVehicle(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Vehicle.removeVehicle(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
