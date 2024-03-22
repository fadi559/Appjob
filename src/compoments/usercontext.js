import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usershare, setuesershare] =useState();

    return (
        <UserContext.Provider value={{ user, setUser,usershare,setuesershare}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };