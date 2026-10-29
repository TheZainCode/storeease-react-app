import { createContext, useContext, useState } from "react";
const AuthContext=createContext(null);
export default function AuthProvider({children}){
    const [user, setUser]=useState(null);
    const login=(userData)=>{
        setUser(userData);
    };
    const logout=()=>{
        setUser(null);
    };
    const isAuthenticated=Boolean(user);
    return(
    <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
    );
}
export function useAuth(){
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used with in AuthProvider");
    }
    return context;
}