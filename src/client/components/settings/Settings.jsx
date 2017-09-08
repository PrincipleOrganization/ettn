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
        <li>
          <Link to="/settings/cleaner">
            <span className="settings-icon"><Icon.Remove /></span>
            Видалення елементів
          </Link>
        </li>
      </ul>
    </dev>
  </div>
);

export default Settings;