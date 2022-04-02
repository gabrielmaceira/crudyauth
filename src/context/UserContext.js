import React, { useState, useEffect, createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../firebase/crudUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth(app);
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("AUTH USER", user)

                getUserData('users', user.uid)
                    .then((userData) => {
                        setUser(userData)
                        setIsLoading(false)
                    })
                    .catch(e => alert(e))

            } else {
                setUser()
                navigate('/login')
                setIsLoading(false)
            }
        });
    }, [])

    const createUser = async (email, password) => {
        try {
            const newUserData = await createUserWithEmailAndPassword(auth, email, password)
            return newUserData.user.uid
        }
        catch (error) {
            throw new Error(error)
        }
    }

    const loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
        catch (error) {
            throw new Error(error)
        }
    }

    const signOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error)
            alert(error)
        });
    }

    return <UserContext.Provider value={{
        user, isLoading, createUser, loginUser, signOutUser
    }}>
        {children}
    </UserContext.Provider>

}