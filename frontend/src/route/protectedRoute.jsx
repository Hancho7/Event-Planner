import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRoles }) => {
  const { data } = useSelector((state) => state.login);
  const userRole = data?.role;

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
