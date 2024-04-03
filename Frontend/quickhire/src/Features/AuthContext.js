import React, {useState, useEffect, createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    //TODO: Give reference for this
    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false);
    }, []);

    return(
        <AuthContext.Provider value={{token, setToken, loading}}>
            {children}
        </AuthContext.Provider>
    );
}