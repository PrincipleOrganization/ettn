import Nomenclature from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Nomenclature.getNomenclature());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Nomenclature.createNomenclature(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Nomenclature.changeNomenclature(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Nomenclature.removeNomenclature(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
