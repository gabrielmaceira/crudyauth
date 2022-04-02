import React, { useEffect, useRef, useState } from 'react';
import { AdminList } from './AdminList';
import { getItems, addItem } from '../firebase/crud';
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const Admin = () => {
    const [itemList, setItemList] = useState([])
    const { forceUpdate, changeStatus } = useContext(LoadingContext)

    const reference = useRef({})

    useEffect(async () => {
        const myItems = await getItems('items')
        setItemList(myItems)
    }, [forceUpdate])

    const saveItem = async (event) => {
        event.preventDefault();
        const itemName = reference.current.name.value
        const itemPrice = reference.current.price.value

        if (itemName.trim() !== "" && itemPrice > 0) {
            try {
                await addItem('items', itemName, itemPrice)
                changeStatus()
            }
            catch (e) {
                alert(e)
            }
        }
        else {
            alert("Por favor completar los campos con datos validos")
        }
    }

    return <>
        <h3 style={{ textAlign: "center" }}>Agregar Item</h3>
        <div className="form-container">
            <form onSubmit={saveItem} className='big-form'>
                <label>Nombre</label>
                <input type="text" ref={el => reference.current.name = el} />
                <label>Precio</label>
                <input type="number" ref={el => reference.current.price = el} />
                <input type="submit" value="Guardar Item" />
            </form>
        </div>

        <AdminList itemList={itemList} />
    </>

}