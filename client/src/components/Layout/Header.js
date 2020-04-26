import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useGlobal from '../../store';
import styles from './Header.module.css';

function Header() {
  const [globalState, globalActions] = useGlobal();
  const { isAuthenticated } = globalState;
  const history = useHistory();
  const [displayMenu, toggleDisplayMenu] = useState(false);

  async function logout() {
    const status = await globalActions.users.logout();
    if (status === 200) history.replace({ pathname: '/' });
  }

  function handleKeyDown(e) {
    e.keyCode === 77 && toggleDisplayMenu(!displayMenu);
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>myClimbingDrills</h1>
      </div>

      <div
        onClick={() => toggleDisplayMenu(!displayMenu)}
        onKeyDown={handleKeyDown}
        className={`${styles.hamburger} ${displayMenu ? styles.displayed : ''}`}
        role="button"
        aria-label="Open the menu"
        tabIndex={0}
      >
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
      </div>

      {displayMenu && (
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
      )}
    </div>
  );
}

export default Header;
