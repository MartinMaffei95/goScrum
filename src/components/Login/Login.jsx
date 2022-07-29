import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const initialValues = {
    userName: '',
    password: '',
  };

  const onSubmit = () => {
    const { userName, password } = values;
    fetch(`${REACT_APP_API_URL}auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.message) {
          case 'OK':
            localStorage.setItem('token', data?.result?.token);
            localStorage.setItem('username', data?.result?.user?.userName);
            localStorage.setItem('teamID', data?.result?.user?.teamID);
            navigate('/', { replace: true });
            break;
          case 'UNAUTHORIZED':
            Swal.fire({
              title: 'Unauthorized',
              text: 'Unauthorized',
              confirmButtonText: 'Aceptar',
              width: '300px',
              timer: 5000,
              timerProgressBar: true,
            });
            break;
          case 'NOT FOUND':
            Swal.fire({
              title: 'NOT FOUND',
              text: 'NOT FOUND',
              confirmButtonText: 'Aceptar',
              width: '300px',
              timer: 5000,
              timerProgressBar: true,
            });
            break;
          default:
            break;
        }
      });
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
    password: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <section className="initSection">
      <form className="form login" onSubmit={formik.handleSubmit}>
        <h3>Iniciar Sesión</h3>
        <div className="inputs-container_div">
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="userName"
            name="userName"
            id="userName"
            className={errors.userName && touched.userName ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
          />
        </div>
        {errors.userName && touched.userName && (
          <span className="error-message">{errors.userName}</span>
        )}
        <div className="inputs-container_div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={errors.password && touched.password ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </div>
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <div>
          <button className="button primary" type="submit">
            Enviar
          </button>
        </div>
        <div>
          <Link className="button terciary" to="/signup">
            Creá una cuenta!
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
