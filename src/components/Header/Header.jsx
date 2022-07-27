import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.styles.css';
import { getUserConfig } from '../../store/actions/userActions';
import { useEffect } from 'react';
const Header = () => {
  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserConfig({ theme_color: 'secondary' }));
  }, [dispatch]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('teamID');
    navigate('/login', { replace: true });
  };

  // const { theme_color } = useSelector((state) => {
  //   return state.userReducer;
  // });

  return (
    <header>
      <span>
        <span>Go</span>Scrum
      </span>
      <div>
        <div>tareas creadas: {tasks.length} </div>
        <span>{localStorage.getItem('username')}</span>
        <span>{localStorage.getItem('teamID')}</span>
        <button onClick={handleLogout}>Cerrar Sesion</button>

        <div> DESPLEGABLE</div>
      </div>
    </header>
  );
};

export default Header;
