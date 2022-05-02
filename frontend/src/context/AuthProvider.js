import { createContext, useState } from "react";

const AuthContext = createContext({});

//inside the AuthProvider we destructure the children
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// children: components inside the AuthProvider

export default AuthContext;