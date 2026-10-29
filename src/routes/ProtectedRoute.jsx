import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute(){
    const loaction=useLocation();
    const { isAuthenticated }=useAuth();
    if(!isAuthenticated){
        return(
            <Navigate to="/login" replace state={{from:loaction}} />
        );
    }
    return <Outlet />
}
export default ProtectedRoute;