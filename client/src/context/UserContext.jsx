import { createContext, useContext, useState } from "react";


export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)

    //Function to update user data
    const updateUser = (userData) => {
        setUser(userData)
    }

    //Function to clear user data eg. on logout
    const clearUser = () => {
        setUser(null)
    }

    return <UserContext.Provider value={{ user, updateUser, clearUser }}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }

    return context;
};