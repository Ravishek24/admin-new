import { Navigate } from 'react-router-dom';

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    const { exp, is_admin} = payload;

    const isExpired = exp * 1000 < Date.now();
    

    return !isExpired && is_admin;
  } catch (err) {
    return false;
  }
};

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("token")
    return <Navigate to="/sign-in" replace />;
  }

  return element;
};

export default PrivateRoute;
