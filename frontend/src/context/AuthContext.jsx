import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token")
    })

    const login = (fakeToken) => {
        localStorage.setItem("token", fakeToken)
        setToken(fakeToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{token, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}