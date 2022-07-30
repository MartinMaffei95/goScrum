import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserConfig } from '../../store/actions/userActions';
import { useEffect, useState } from 'react';

import { FaRegCopy } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';

const Header = () => {
  const [viewOn, setViewOn] = useState(false);
  const [teamID, setTeamID] = useState(localStorage.getItem('teamID'));

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserConfig({ theme_color: 'secondary' }));
  }, [dispatch]);

  useEffect(() => {
    setTeamID(localStorage.getItem('teamID'));
  }, []);

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
  const handleView = () => {
    !viewOn ? setViewOn(true) : setViewOn(false);
  };

  const handlecopy = (e) => {
    navigator.clipboard.writeText(teamID);
    //ToDo: Agregar tasotyfy para notifacr la copia
  };

  return (
    <header>
      <div className="logo">
        <span className="logo accent">Go</span>Scrum
      </div>
      <div>
        <div>
          <div
            className={`userName button terciary ${viewOn && 'onScreen'}`}
            onClick={handleView}
          >
            {localStorage.getItem('username')}
            <GoTriangleDown className={`triangle ${viewOn && 'onScreen'}`} />
          </div>
          <ul className={`userMenu  ${viewOn ? 'onScreen' : ''}`}>
            <li className="tokenContainer">
              <span>Team ID:</span> <span>{teamID && teamID}</span>
              <button
                className="button terciary copyButton"
                onClick={(e) => {
                  handlecopy(e);
                }}
              >
                <FaRegCopy />
              </button>
            </li>
            <li>
              <div>Tareas creadas: {tasks && tasks.length} </div>
            </li>
            <li>
              <button className="button terciary" onClick={handleLogout}>
                Cerrar Sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
