import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserAuth =()=>{
    return useContext(UserContext);
}
export const AppContext =({children})=>{
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const setAndStoreCurrentUser = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };
    const clearCurrentUser = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };
    const value = {
        currentUser,
        setCurrentUser: setAndStoreCurrentUser,
        clearCurrentUser
    };
    return(
        <>
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
        
        </>
    )
}