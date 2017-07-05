import Point from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Point.getPoints());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Point.createPoint(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Point.changePoint(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Point.removePoint(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
