import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/auth/authSlice';
import {
  selectAuthIsLoading,
  selectAuthUserData,
} from '../../redux/auth/authSlice.selectors';

import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading);

  const handleLogout = () => dispatch(apiLogoutUser());

  const userEmail = userData?.email ?? 'Could`t get user email';
  return (
    <div className={css.userMenu}>
      <p className={css.userMenuEmail}>{userEmail}</p>
      <button
        className={css.userMenuButton}
        type="button"
        disabled={isLoading}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
