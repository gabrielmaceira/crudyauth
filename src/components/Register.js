import { useContext, useRef } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { addUser } from "../firebase/crudUser"

export const Register = () => {
    const { createUser } = useContext(UserContext)
    const reference = useRef({})
    const navigate = useNavigate()

    const doRegister = async (event) => {
        event.preventDefault();
        const formName = reference.current.name.value
        const formPhone = reference.current.phone.value
        const formEmail = reference.current.email.value
        const formPassword = reference.current.password.value

        if (formName.trim() !== "" && formPhone.trim() !== "" &&
            formEmail.trim() !== "" && formPassword.trim() !== ""
        ) {
            try {
                const uid = await createUser(formEmail, formPassword)
                await addUser('users', formName, formEmail, formPhone, uid)
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
            <form onSubmit={doRegister} className="big-form marginTop">
                <label>Nombre</label>
                <input ref={el => reference.current.name = el} type="text" required />
                <label>Telefono</label>
                <input ref={el => reference.current.phone = el} type="text" required />
                <label>Email</label>
                <input ref={el => reference.current.email = el} type="email" required />
                <label>Password</label>
                <input ref={el => reference.current.password = el} type="password" required />
                <input type="submit" value="REGISTER" />
                
                <button className="register-button" onClick={() => navigate('/login')}>Loguearse</button>
            </form>
        </div>
    </>

}