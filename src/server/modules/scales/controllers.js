import Scale from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Scale.getScales());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const one = (req, res) => {
  try {
    res.status(200).json(Scale.getScale(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Scale.createScale(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Scale.changeScale(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Scale.removeScale(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
