import { Loader, Navigation, UserMenu } from 'components';

import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';

import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      <div className={css.mainBlock}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <main>{children}</main>
    </div>
  );
};
