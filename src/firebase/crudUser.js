import { setDoc, getDoc, doc } from "firebase/firestore";
import db from './firebase'

export const getUserData = async (collectionName, id) => {
    try {
        const docData = doc(db, collectionName, id)
        const userData = await getDoc(docData)

        return { ...userData.data(), id: userData.id }
    }
    catch (e) {
        throw new Error(e)
    }
}

export const addUser = async (collectionName, name, email, phone, id) => {
    try {
        await setDoc(doc(db, collectionName, id), { name, email, phone })
    }
    catch (e) {
        throw new Error(e)
    }
}
