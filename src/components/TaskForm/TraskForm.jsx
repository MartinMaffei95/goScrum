import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TaskForm.styles.css';

const TaskForm = () => {
  const initialValues = {
    title: '',
    status: '',
    priority: '',
    description: '',
  };

  const onSubmit = () => {
    alert();
  };

  const errorMessages = {
    title: {
      minCaracterMessage: `La cantidad minima de caracteres es de 4`,
    },
    required: '* Este campo es obligatorio',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(
        errorMessages.title.minCaracter,
        errorMessages.title.minCaracterMessage
      )
      .required(errorMessages.required),
    status: Yup.string().required(errorMessages.required),
    priority: Yup.string().required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleChange, handleSubmit, errors, touched, handleBlur } = formik;

  return (
    <section>
      <h3>Crea tus Tareas!</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Coloca tu titulo"
              className={errors.title ? 'error' : ''}
            />
          </div>
          {errors.title && touched.title && (
            <span className="error-message">{errors.title}</span>
          )}
          <div>
            <select name="status" onChange={handleChange} onBlur={handleBlur}>
              <option value="">Selecciona un estado</option>
              <option value="NEW">Nuevo</option>
              <option value="INPROCESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
          </div>
          {errors.status && touched.status && (
            <span className="error-message">{errors.status}</span>
          )}
          <div>
            <select name="priority" onChange={handleChange} onBlur={handleBlur}>
              <option value="">Seleccionar una prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MID">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {errors.priority && touched.priority && (
            <span className="error-message">{errors.priority}</span>
          )}
          <div>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Describe tu tarea..."
            />
          </div>
        </div>
        <button type="submit"> Crear </button>
      </form>
    </section>
  );
};

export default TaskForm;
