import { Navigate, Outlet } from 'react-router';
import useToken from '../utils/useToken';

function RequireAuth() {
  const { token } = useToken();

  return token ? <Outlet /> : <Navigate to='/login' />;
}

export default RequireAuth;
