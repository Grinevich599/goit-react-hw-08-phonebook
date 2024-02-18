import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};
