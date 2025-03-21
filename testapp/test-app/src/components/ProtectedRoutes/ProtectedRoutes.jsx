import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/userContext";

const ProtectedRoute = () => {
  const { token } = useUser();
  const checkToken = token === null || token === undefined || token === "";
  return !checkToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
