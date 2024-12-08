import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    // State for managing email
    const [email, setEmail] = useState("");

    // State for managing userInfo
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
    });

    return (
        <UserContext.Provider value={{ email, setEmail, userDetails, setUserDetails}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
