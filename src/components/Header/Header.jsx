import { useNavigate } from 'react-router-dom';
import './Header.styles.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('logged');
    navigate('/login', { replace: true });
  };
  return (
    <header>
      <span>
        <span>Go</span>Scrum
      </span>
      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </header>
  );
};

export default Header;
