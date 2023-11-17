import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { withFormik } from 'formik';

const AuthForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const location = useLocation();
  const [title, setTitle] = useState(location.pathname === '/login' ? 'Login' : 'Register');
  useEffect(() => {
    setTitle(location.pathname === '/login' ? 'Login' : 'Register');
  }, [location.pathname]);

  return (
    <div>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        {title === 'Register'
          ? (
            <div className="input_block">
              <input
                type="text"
                name="name"
                placeholder="Enter your username"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && <div id="error_message">{errors.name}</div>}
            </div>
          )
          : null}
        <div className="input_block">
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
        </div>
        <div className="input_block">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && <div id="feedback">{errors.password}</div>}
        </div>
        {title === 'Register'
          ? (
            <div className="input_block">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword && <div id="feedback">{errors.confirmPassword}</div>}
            </div>
          )
          : null}
        <div className="input_block">
          <button type="submit">
            {
            title === 'Register' ? 'Register' : 'Login'
          }
          </button>
        </div>

        <Link to={title === 'Register' ? '/login' : '/signup'}>{title === 'Register' ? 'Login' : 'Register'}</Link>
      </form>
    </div>
  );
};

const AuthFormInhanced = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password mismatch';
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
})(AuthForm);

export default AuthFormInhanced;
