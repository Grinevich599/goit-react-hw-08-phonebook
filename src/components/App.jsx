import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SharedLayout } from './SharedLayout/SharedLayout';
import { apiRefreshUser } from '../redux/auth/authSlice';
import { PrivateRoute, RestrictedRoute } from './index';
import HomePage from 'pages/HomePage/HomePage';

const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
