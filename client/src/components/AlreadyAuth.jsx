import { Navigate, Outlet } from 'react-router';
import useToken from '../utils/useToken';

function AlreadyAuth() {
  const { token } = useToken();

  return token ? <Navigate to='/dashboard' /> : <Outlet />;
}

export default AlreadyAuth;
