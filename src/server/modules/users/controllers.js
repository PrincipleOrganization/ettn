import User from './model';

export const all = (req, res) => {
  try {
    const users = User.getUsers();
    if (req.query.hasOwnProperty('used')) {
      const used = [];
      for (let i = 0; i < users.length; i += 1) {
        const user = users[i];
        if (!user.mark) {
          used.push(user);
        }
      }
      res.status(200).json(used);
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const one = (req, res) => {
  try {
    res.status(200).json(User.getUser(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const login = (req, res) => {
  try {
    res.status(200).json(User.loginUser(req.user));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const create = (req, res) => {
  try {
    res.status(201).json(User.createUser(req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const change = (req, res) => {
  try {
    res.status(200).json(User.changeUser(req.params.id, req.body));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};

export const remove = (req, res) => {
  try {
    res.status(200).json(User.removeUser(req.params.id));
  } catch (e) {
    res.status(400).json(e.toString());
  }
};
