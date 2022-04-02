import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export const AlreadyLoggedIn = ({ children }) => {
    const { user, isLoading } = useContext(UserContext)

    return user ? <Navigate to="/" /> : (
        isLoading ? <h1>BUSCANDO DATOS DE USUARIO...</h1>
            :
            children
    )   
}