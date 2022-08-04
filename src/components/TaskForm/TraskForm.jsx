import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { getTasks } from '../../store/actions/tasksActions';

import { useSelector, useDispatch } from 'react-redux';
import { GrFormClose } from 'react-icons/gr';
const TaskForm = () => {
  const { REACT_APP_API_URL } = process.env;

  const [viewOn, setViewOn] = useState(false);
  const handleView = () => {
    !viewOn ? setViewOn(true) : setViewOn(false);
  };

  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  };

  const errorMessages = {
    title: {
      minCaracterMessage: `La cantidad minima de caracteres es de 4`,
    },
    required: '* Este campo es obligatorio',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, 'minimo 4 caracetere')
      .required(errorMessages.required),
    status: Yup.string().required(errorMessages.required),
    importance: Yup.string().required(errorMessages.required),
    description: Yup.string().required(errorMessages.required),
  });

  const dispatch = useDispatch();
  const onSubmit = () => {
    const { title, status, importance, description } = values;
    fetch(`${REACT_APP_API_URL}task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        task: {
          title,
          status,
          importance,
          description,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getTasks(''));
        setViewOn(false);
        resetForm();
        //TOAST
        toast.success('Tarea Creada!');
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    resetForm,
    values,
  } = formik;

  return (
    <section className="newTaskSection">
      <div>
        <ToastContainer />
      </div>
      <button
        className={`button primary newTask ${viewOn && 'onScreen'} `}
        onClick={handleView}
      >
        + Nueva Tarea!
      </button>

      <form
        className={`form create_Task ${viewOn && 'onScreen'}`}
        onSubmit={handleSubmit}
      >
        <div className="title_form">
          <h3>Crea tus Tareas! </h3>
          <GrFormClose
            className="close_Form"
            onClick={() => {
              setViewOn(false);
            }}
          />
        </div>

        <div className="inputs-container ">
          <div className="inputs-container_div filterContainer">
            <label htmlFor="title"> Titulo</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tarea 1"
              className={errors.title && touched.title ? 'error' : ''}
              value={values.title}
            />
          </div>
          {errors.title && touched.title && (
            <span className="error-message">{errors.title}</span>
          )}
          <div className="inputs-container_div filterContainer">
            <label htmlFor="status"> Estado:</label>
            <select
              className={errors.status && touched.status ? 'error' : ''}
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option value="">Selecciona un estado</option>
              <option value="NEW">Nuevo</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
          </div>
          {errors.status && touched.status && (
            <span className="error-message">{errors.status}</span>
          )}
          <div className="inputs-container_div filterContainer">
            <label htmlFor="importance">Prioridad:</label>
            <select
              className={errors.importance && touched.importance ? 'error' : ''}
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.importance}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {errors.importance && touched.importance && (
            <span className="error-message">{errors.importance}</span>
          )}
          <div className="inputs-container_div filterContainer">
            <label htmlFor="description"> Coloca una descripcion</label>
            <textarea
              resize="none"
              name="description"
              className={
                errors.description && touched.description ? 'error' : ''
              }
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Describe tu tarea..."
              value={values.description}
            />
          </div>
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button className="button primary createButton" type="submit">
          Crear
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
