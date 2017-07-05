import Client from './model';

export const all = (req, res) => {
  try {
    res.status(200).json(Client.getClients());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(Client.createClient(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(Client.changeClient(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(Client.removeClient(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
