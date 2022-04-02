import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
    const { user, isLoading } = useContext(UserContext)

    return user ? children : (
        isLoading ? <h1>BUSCANDO DATOS DE USUARIO...</h1>
            :
            <Navigate to="/login" />
    )
}