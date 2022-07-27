import './App.css';
import { lazy, Suspense } from 'react';
import Login from './components/Login/Login';
import Tasks from './components/Tasks/Tasks';
import Register from './components/Register/Register';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Error404 = lazy(() => import('./components/views/Error404/Error404'));

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<>CARGANDO...</>}>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Error404 />
              </motion.div>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
