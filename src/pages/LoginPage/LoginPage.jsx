import { useDispatch } from 'react-redux';
import { apiLoginUser } from '../../redux/auth/authSlice';

import css from './LoginPage.module.css';
const LoginPage = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = { email, password };
    dispatch(apiLoginUser(formData));
  };

  return (
    <div className={css.loginFormContainer}>
      <h1 className={css.logintext}>Login</h1>
      <form className={css.loginFormGroup} onSubmit={onSubmit}>
        <label className={css.loginFormlabel}>
          Email
          <input
            className={css.loginInputField}
            type="email"
            name="userEmail"
            placeholder="Email@gmail.com"
            required
          />
        </label>
        <label className={css.loginFormlabel}>
          Password
          <input
            className={css.loginInputField}
            type="password"
            name="userPassword"
            placeholder="*******"
            minLength={7}
            required
          />
        </label>
        <button className={css.loginFormButton} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
