import { useDispatch } from 'react-redux';
import { apiRegisterUser } from '../../redux/auth/authSlice';

import css from '../LoginPage/LoginPage.module.css';
const RegisterPage = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = { name, email, password };
    dispatch(apiRegisterUser(formData));
  };

  return (
    <div className={css.loginFormContainer}>
      <h1 className={css.logintext}>Register</h1>
      <form className={css.loginFormGroup} onSubmit={onSubmit}>
        <label className={css.loginFormlabel}>
          Name
          <input
            className={css.loginInputField}
            type="text"
            name="userName"
            placeholder="Name"
            minLength={2}
            required
          />
        </label>
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

export default RegisterPage;
