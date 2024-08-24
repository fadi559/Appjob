import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
                                        // it was null 
    const [user, setUser] = useState({ _id: '', interests: '', jobType: '', currentJob: '',User:'',Job:'',});
    const [usershare, setuesershare] =useState();

    return (
        <UserContext.Provider value={{ user, setUser,usershare,setuesershare}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };