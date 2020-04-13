import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useGlobal from '../../store';
import styles from './Header.module.css';

function Header() {
  const [globalState, globalActions] = useGlobal();
  const { isAuthenticated } = globalState;
  const history = useHistory();

  async function logout() {
    const status = await globalActions.users.logout();
    if (status === 200) history.replace({ pathname: '/' });
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>MCD</h1>
      </div>

      <nav>
        {isAuthenticated ? (
          <ul className={styles.navList}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
            <li>
              <button onClick={logout} className={styles.logBtn}>
                Log out
              </button>
            </li>
          </ul>
        ) : (
          <ul className={styles.navList}>
            <li>
              <Link to="/signup" className={styles.logBtn}>
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.logBtn}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Header;
