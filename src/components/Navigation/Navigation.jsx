import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';

import css from './Navigation.module.css';
export const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <div className={`${css.navigateMenu} ${!isLoggedIn ? css.isntLogin : ''} `}>
      <NavLink className={css.formButtonHeader} to="/">
        Home
      </NavLink>
      <div>
        {isLoggedIn ? (
          <NavLink className={css.formButtonHeader} to="/contacts">
            Contacts
          </NavLink>
        ) : (
          <div>
            <NavLink className={css.formButtonHeader} to="/register">
              Register
            </NavLink>
            <NavLink className={css.formButtonHeader} to="/login">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
