import { useContext, useRef } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const { loginUser } = useContext(UserContext)
    const reference = useRef({})
    const navigate = useNavigate()

    const doLogin = async (event) => {
        event.preventDefault();

        if (reference.current.email.value.trim() !== "" && reference.current.password.value.trim() !== "") {
            try {
                await loginUser(reference.current.email.value, reference.current.password.value)
            }
            catch (error) {
                alert(error)
            }
        }
        else {
            alert("Por favor completar los campos con informacion valida!")
        }
    }

    return <>
        <div className="form-container">
            <form onSubmit={doLogin} className="big-form marginTop">
                <label>Email</label>
                <input ref={el => reference.current.email = el} type="email" required />
                <label>Password</label>
                <input ref={el => reference.current.password = el} type="password" required />
                <input type="submit" value="LOGIN" />
                <button className="register-button" onClick={() => navigate('/register')}>Registrarse</button>
            </form>
        </div>
    </>

}