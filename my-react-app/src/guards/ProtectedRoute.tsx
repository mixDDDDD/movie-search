import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export default function ProtectedRoute() {
  const userName = useAppSelector(
    (state) => state.user.name
  );

  if (!userName) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}