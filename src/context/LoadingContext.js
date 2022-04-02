import React, { useState, createContext } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [forceUpdate, setForceUpdate] = useState(false)

    console.log("FORCE", forceUpdate)

    const changeStatus = () => {
        setForceUpdate(!forceUpdate)
    }

    return <LoadingContext.Provider value={{
        changeStatus, forceUpdate
    }}>
        {children}
    </LoadingContext.Provider>

}