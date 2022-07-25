import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'El mail es requerido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    }
    return errors;
  };

  const onSubmit = () => {
    localStorage.setItem('logged', true);
    navigate('/', { replace: true });
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  return (
    <div className="Form_container">
      <form onSubmit={formik.handleSubmit}>
        <h3>Iniciar Sesión</h3>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        {formik.errors.email && <div>{formik.errors.email}</div>}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        {formik.errors.password && <div>{formik.errors.password}</div>}
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/signup">Creá una cuenta!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
