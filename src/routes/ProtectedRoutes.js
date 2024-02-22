
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({children}) => {

    const token = sessionStorage.getItem("cuser");
    
    return token ? children : <Navigate to="/login" />;
}
