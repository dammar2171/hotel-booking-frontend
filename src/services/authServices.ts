import api from "../api/axios";
import { type UserRegisterData } from "../types";

export const register = (user:UserRegisterData)=>{
  return api.post("/auth/register",user);
}

export const login = (email:string,password:string)=>{
  return api.post("/auth/login",{email,password});
}