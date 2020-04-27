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

      <nav className={`${styles.nav} ${displayMenu ? styles.activeMenu : ''}`}>
        {isAuthenticated ? (
          <ul className={styles.navList}>
            <li>
              <NavLink onClick={() => toggleDisplayMenu(false)} to="/" activeClassName={styles.activeLink} exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => toggleDisplayMenu(false)} to="/account" activeClassName={styles.activeLink}>
                Account
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => toggleDisplayMenu(false)} to="/about" activeClassName={styles.activeLink}>
                About
              </NavLink>
            </li>
            <li className={styles.logoutLi}>
              <button onClick={logout} className={`${styles.btn} ${styles.logout}`}>
                Log out
              </button>
            </li>
          </ul>
        ) : (
          <>
            <ul className={styles.navList}>
              <li>
                <NavLink onClick={() => toggleDisplayMenu(false)} to="/" activeClassName={styles.activeLink} exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleDisplayMenu(false)} to="/about" activeClassName={styles.activeLink}>
                  About
                </NavLink>
              </li>
            </ul>
            <div className={styles.navBtns}>
              <Link onClick={() => toggleDisplayMenu(false)} to="/login" className={`${styles.btn} ${styles.login}`}>
                Login
              </Link>
              <Link onClick={() => toggleDisplayMenu(false)} to="/signup" className={`${styles.btn} ${styles.signup}`}>
                Sign up
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
