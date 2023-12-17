import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserAuth =()=>{
    const authContex =  useContext(UserContext);
    return authContex;
}
export const AppContext =({children})=>{
    const[currentUser , setCurrentUser] = useState(null);
    const value = {
        currentUser,
        setCurrentUser
    }
    return(
        <>
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
        
        </>
    )
}