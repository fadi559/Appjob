import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
                                        // it was null 
    const [user, setUser] = useState({ _id: '', interests: '', jobType: '', currentJob: '',User:'',Job:'',});
    const [usershare, setuesershare] =useState();
    const [language, setLanguage] =useState("eng");//  eng/hebrew/arabic


    return (
        <UserContext.Provider value={{ user, setUser,usershare,setuesershare,language, setLanguage}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };