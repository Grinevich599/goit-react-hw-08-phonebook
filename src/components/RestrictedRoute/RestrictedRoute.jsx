import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? <Navigate to="/contacts" replace /> : children;
};
