import { useContext, useState, } from "react";
import { deleteItem, updateItem } from '../firebase/crud';
import { LoadingContext } from "../context/LoadingContext";

export const Item = ({ id, name, price }) => {
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({ name, price })
    const { changeStatus } = useContext(LoadingContext)

    const handleChange = (event) => {
        console.log(event.target.value)
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const removeItem = async (id) => {
        try {
            await deleteItem('items', id)
            changeStatus()
        }
        catch (error) {
            alert(error)
        }
    }

    const editItem = async (event) => {
        event.preventDefault()
        if (formData.name.trim() !== "" && formData.price > 0) {
            try {
                await updateItem('items', formData.name, formData.price, id)
                changeStatus()
                setEditing(false)
            }
            catch (error) {
                alert(error)
            }
        }
        else {
            alert("Por favor completar los campos con datos validos")
        }
    }

    return <div className="item-detail">
        {editing ?
            <form onSubmit={editItem}>
                <label>Nombre</label>
                <input type="text" onChange={handleChange} value={formData.name} name="name" />
                <label>Precio</label>
                <input type="number" onChange={handleChange} value={formData.price} name="price" />
                <input type="submit" value="Guardar Item" />
            </form>
            :
            <>
                <p>{name} - ${price}</p>
                <button onClick={() => setEditing(true)}>EDITAR</button>
                <button onClick={() => removeItem(id)}>BORRAR</button>
            </>}
    </div>

}