import LoadingBill from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(LoadingBill.getLoadingBills());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(LoadingBill.createLoadingBill({ ...req.body, author: req.user.id }));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(LoadingBill.changeLoadingBill(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(LoadingBill.removeLoadingBill(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
