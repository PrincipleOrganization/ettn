import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../elements';

const Settings = () => (
  <div>
    <h3>Налаштування</h3>
    <dev>
      <ul className="settings-list">
        <li>
          <Link to="/settings/users">
            <span className="settings-icon"><Icon.Users /></span>
            Користувачі
          </Link>
        </li>
<<<<<<< HEAD

=======
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
        <li>
          <Link to="/settings/cleaner">
            <span className="settings-icon"><Icon.Remove /></span>
            Видалення елементів
          </Link>
        </li>
<<<<<<< HEAD

        <li>
          <Link to="/settings/db">
            <span className="settings-icon"><Icon.Database /></span>
            База даних
          </Link>
        </li>
=======
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
      </ul>
    </dev>
  </div>
);

export default Settings;