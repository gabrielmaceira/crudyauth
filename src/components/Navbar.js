import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Navbar = () => {

    const { user, signOutUser } = useContext(UserContext)

    return <header className="navbar">

        {user ?
            <ul>
                <li><p>Hola {user.name}!</p></li>
                <li>{user.email}  <button onClick={signOutUser}>LOGOUT</button></li>
            </ul>
            :
            <ul>
                <li>Por favor loguearse</li>
            </ul>

        }
    </header>

}