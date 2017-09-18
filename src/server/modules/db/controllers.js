import { getDb, setDb} from './model';

export const get = (req, res) => {
  try {
    res.status(200).json(getDb());
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const set = (req, res) => {
  try {
    res.status(200).json(setDb(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
