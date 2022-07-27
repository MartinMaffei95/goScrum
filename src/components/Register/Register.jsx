import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel, avatarGroupClasses } from '@mui/material';

const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}auth/data`)
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, []);

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
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
    email: Yup.string()
      .email('Debe ser un email valido')
      .required(errorMessages.required),
    // teamID: Yup.string().required(errorMessages.required),
    role: Yup.string().required(errorMessages.required),
    continent: Yup.string().required(errorMessages.required),
    region: Yup.string().required(errorMessages.required),
  });

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch(`${REACT_APP_API_URL}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'CREATED') {
          return navigate('/', { replace: true });
        }
        alert('error');
      });
  };

  const handleChangeContinent = (value) => {
    setFieldValue('continent', value);
    if (value !== 'America') setFieldValue('region', 'Otro');
  };

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
    <div className="Form_container">
      <form onSubmit={formik.handleSubmit}>
        <h3>Creá tu usuario</h3>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            id="username"
            className={errors.userName && touched.userName ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
          />
        </div>
        {errors.userName && touched.userName && (
          <span className="error-message">{errors.userName}</span>
        )}
        <div>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={errors.email && touched.email ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </div>
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() => {
                formik.setFieldValue('switch', !formik.values.switch);
              }}
              name="switch"
              color="secondary"
            />
          }
          label="Ya tienes un equipo creado? Unete!"
        />
        {values.switch && (
          <div>
            <label htmlFor="teamID">Introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              className={errors.teamID && touched.teamID ? 'error' : ''}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              value={values.teamID}
            />
          </div>
        )}

        {errors.teamID && touched.teamID && (
          <span className="error-message">{errors.teamID}</span>
        )}
        <div>
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            className={errors.role && touched.role ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
          >
            <option value="">Selecciona tu rol</option>
            {data?.Rol?.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {errors.role && touched.role && (
          <span className="error-message">{errors.role}</span>
        )}
        <div>
          <label htmlFor="continent">Continente</label>
          <select
            name="continent"
            className={errors.continent && touched.continent ? 'error' : ''}
            onChange={(e) => {
              handleChangeContinent(e.currentTarget.value);
            }}
            onBlur={handleBlur}
            value={values.continent}
          >
            <option value="">Seleccioná tu continente</option>
            {data?.continente?.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {errors.continent && touched.continent && (
          <span className="error-message">{errors.continent}</span>
        )}
        {values.continent === 'America' && (
          <div>
            <label htmlFor="region">Region</label>
            <select
              name="region"
              className={errors.region && touched.region ? 'error' : ''}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
            >
              <option value="">Selecciona tu region</option>
              {data?.region?.map((opt) => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {errors.region && touched.region && (
          <span className="error-message">{errors.region}</span>
        )}
        <div>
          <button type="submit">Crear usuario</button>
        </div>
        <div>
          <Link to={'/login'}> Inicia sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
