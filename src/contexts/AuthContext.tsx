import { createContext,type ReactNode, useContext, useEffect, useState } from "react";
import type { User } from "../types";

interface AuthContextType{
  user:User | null;
  token:string | null;
  login:(token:string,user:User)=> void;
  logout:()=>void;
  isAdmin:boolean;
  isLogged:boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider =({children}:{children:ReactNode})=>{
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken) {
    setToken(savedToken);
  }

  if (savedUser && savedUser !== "undefined") {
    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Invalid user in localStorage", error);
      localStorage.removeItem("user");
    }
  }
}, []);

  const login = (token:string,user:User):void=>{
    localStorage.setItem("token",token);
    localStorage.setItem("user",JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  const logout = ():void=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }
  return <AuthContext.Provider value={{
    user,
    token,
    login,
    logout,
    isAdmin:user?.role === "admin",
    isLogged : !!token
  }}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}