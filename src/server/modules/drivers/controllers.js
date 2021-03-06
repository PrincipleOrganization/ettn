import Driver from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Driver.getDrivers());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Driver.createDriver(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Driver.changeDriver(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Driver.removeDriver(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
