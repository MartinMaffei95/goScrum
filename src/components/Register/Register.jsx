import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel, avatarGroupClasses } from '@mui/material';
import Swal from 'sweetalert2';
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
        Swal.fire({
          icon: 'error',
          title: 'EL USUARIO YA EXISTE',
          text: 'El nombre de usuario o direccion de mail ya est?? en uso.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#ff6200',
          width: '300px',
          timer: 5000,
          timerProgressBar: true,
        });
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
    <section className="initSection">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3>Cre?? tu usuario</h3>
        <div className="inputs-container_div">
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            id="username"
            className={errors.userName && touched.userName ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            placeholder="MiUsuario"
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
            placeholder="MiPassword123"
          />
        </div>
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <div className="inputs-container_div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={errors.email && touched.email ? 'error' : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="email@email.com"
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
              color="warning"
            />
          }
          label="Ya tienes un equipo creado? Unete!"
        />
        {values.switch && (
          <div className="inputs-container_div">
            <label htmlFor="teamID">Introduce el identificador de equipo</label>
            <input
              type="text"
              name="teamID"
              className={errors.teamID && touched.teamID ? 'error' : ''}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              value={values.teamID}
              placeholder="TEAM ID"
            />
          </div>
        )}

        {errors.teamID && touched.teamID && (
          <span className="error-message">{errors.teamID}</span>
        )}
        <div className="inputs-container_div">
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
        <div className="inputs-container_div">
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
            <option value="">Seleccion?? tu continente</option>
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
          <div className="inputs-container_div">
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
        <div className="inputs-container_div">
          <button className="button primary" type="submit">
            Crear usuario
          </button>
        </div>
        <div className="">
          <Link className="button terciary" to={'/login'}>
            Inicia sesi??n
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
