import api from "../api/axios";
import { type LoginData, type UserRegisterData } from "../types";

export const registerService = (user:UserRegisterData)=>{
  return api.post("/auth/register",user);
}

export const loginService = (user:LoginData)=>{
  return api.post("/auth/login",user);
}