import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { submitLoginForm, getUserByCondition } from '../../services/axios.service';
import LoadingModal from '../loading-modal';
import { useRouter } from 'next/router';
import styles from './logregform.module.css'


import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  toggleAuthorized,
  toggleLoading,
  loggedUser,
} from '../../redux/actions/loginActions';

function LoginForm() {
  const { authorized, loading, logUser } = useAppSelector(
    state => state.loginReducer,
  );
  const dispatch: any = useAppDispatch();
  const router = useRouter();

  const validation = Yup.object({
    username: Yup.string().min(8).required('username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  });
  validation.validate;

  async function submitLogin(formData: any) {
    // start loading component
    dispatch(toggleLoading());
    const { access_token } = (await submitLoginForm(formData)).data;
    if (access_token) {
      // save token on localstorage
      window.localStorage.access_token = access_token;
      // toggle authorized
      dispatch(toggleAuthorized());
      // fetch User by username
      const { data } = await getUserByCondition(formData.username);
      // save User in loggedUser state
      dispatch(loggedUser(data));
      // stop loading component
      dispatch(toggleLoading());
    } else {
      // stop loading component
      dispatch(toggleLoading());
    }
  }

  return (
    <>
      {loading && <LoadingModal />}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validation}
        onSubmit={async (values, { resetForm }) => {
          await submitLogin(JSON.stringify(values, null, 2));
          router.push('/user-dashboard');
          resetForm();
        }}>
        {formik => (
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <label htmlFor="username">User name</label>
            <div>
              <input
                id="username"
                name="username"
                type="username"
                placeholder="What is your username?"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>

            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;