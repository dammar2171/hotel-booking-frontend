import { createContext, useCallback, useContext, useReducer} from "react";
import type { Pagination, Room } from "../types";
import api from "../api/axios";

interface RoomState{
  rooms:Room[];
  selectedRoom:Room | null;
  loading:boolean;
  error:string | null;
  pagination:Pagination | null;
}

type RoomAction = {type:"FETCH_START"} | {type:"FETCH_SUCCESS",payload:{rooms:Room[],pagination:Pagination}} | {type:"FETCH_ERROR" ,payload:string} |{type:"SET_SELECTED", payload:Room} | {type:"ADD_ROOM",payload:Room} | {type:"UPDATE_ROOM", payload:Room} | {type:"DELETE_ROOM",payload:number} |{type:"CLEAR_ERROR"}

const initilState:RoomState = {
  rooms:[],
  selectedRoom:null,
  loading:false,
  error:null,
  pagination:null,
}

const roomReducer =(state:RoomState,action:RoomAction):RoomState=>{
  switch(action.type){
    case "FETCH_START":
      return {
        ...state,
        loading:true,
        error:null
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading:false,
        error:null,
        rooms:action.payload.rooms,
        pagination:action.payload.pagination,
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading:false,
        error:action.payload,
      }
    case "SET_SELECTED":
      return {
        ...state,
        selectedRoom:action.payload
      }
    case "ADD_ROOM":
      return {
        ...state,
        rooms:[action.payload,...state.rooms]
      }
    case "UPDATE_ROOM":
      return {
        ...state,
        rooms:state.rooms.map((r)=> r.id === action.payload.id ? action.payload : r),selectedRoom:state.selectedRoom?.id === action.payload.id ? action.payload : state.selectedRoom
      }
    case "DELETE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((r) => r.id !== action.payload),
        selectedRoom: state.selectedRoom?.id === action.payload ? null : state.selectedRoom,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error:null,
      }
    default:
      return state;
  }
}
interface RoomContextType{
  rooms:        Room[];
  selectedRoom: Room | null;
  loading:      boolean;
  error:        string | null;
  pagination:   Pagination | null;

  fetchRooms:(page?:number,limit?:number,type?:string)=>Promise<void>;
  fetchRoomById:(id:number)=>Promise<void>;
  createRoom:(data:Omit<Room,"id">)=>Promise<boolean>;
  updateRoom:(id:number,data:Partial<Room>)=>Promise<boolean>;
  deleteRoom:(id:number)=>Promise<boolean>;
  setSelected:(room:Room | null)=>void;
  clearError:()=>void;
}

const RoomContext = createContext<RoomContextType | null>(null);

export function RoomProvider({children}:{children:React.ReactNode}){
  const [state,dispatch]=useReducer(roomReducer,initilState);

  const fetchRooms = useCallback(async(page:number = 1,limit:number = 10,type?:string):Promise<void>=>{
    dispatch({type:"FETCH_START"});
   try {
     const params = new URLSearchParams({page:String(page),limit:String(limit), ...(type && { type })});
    const res = await api.get(`/rooms?${params.toString()}`);
    dispatch({
      type:"FETCH_SUCCESS",
      payload:{rooms:res.data.data,pagination:res.data.pagination},
    })
   } catch (error:any) {
    dispatch({
      type:"FETCH_ERROR",
      payload: error?.response?.data?.message ?? "Failed to fetch rooms"
    });
   }
  },[]);

  const fetchRoomById = useCallback(async(id:number)=>{
    dispatch({type:"FETCH_START"});
    try {
      const res = await api.get(`/rooms/${id}`);
      dispatch({type:"SET_SELECTED",payload:res.data.data});
      dispatch({type:"FETCH_SUCCESS",payload:{
        rooms:state.rooms,
        pagination:state.pagination ??{
          currentPage: 1,
            totalPages:  1,
            totalItems:  state.rooms.length,
            limit:       10,
        }
      }})
    } catch (error:any) {
      dispatch({type:"FETCH_ERROR",payload:error?.response?.data?.message ?? "Failed to fetch room"});
    }
  },[state.rooms,state.pagination]);

  const createRoom = useCallback(async (
    data: Omit<Room, "id">
  ): Promise<boolean> => {
    try {
      const res = await api.post("/rooms", data);
      dispatch({ type: "ADD_ROOM", payload: res.data.data });
      return true;
    } catch (err: any) {
      dispatch({
        type:    "FETCH_ERROR",
        payload: err?.response?.data?.message ?? "Failed to create room",
      });
      return false;
    }
  }, []);

  const updateRoom = useCallback(async(id:number, data:Partial<Room>):Promise<boolean>=>{
    try {
      const res = await api.put(`/rooms/${id}`,data);
      dispatch({type:"UPDATE_ROOM",payload:res.data.data});
      return true;
    } catch (error:any) {
      dispatch({type:"FETCH_ERROR",payload:error?.response?.message ?? "Failed to update room."});
      return false;
    }
  },[]);

  const deleteRoom = useCallback(async(id:number)=>{
    try {
      await api.delete(`/rooms/${id}`);
      dispatch({type:"DELETE_ROOM",payload:id});
      return true;
    } catch (error:any) {
      dispatch({type:"FETCH_ERROR",payload:error?.response?.message ?? "Failed to delete room."})
      return false;
    }
  },[])

  const setSelected = useCallback((room: Room | null)=> {
    dispatch({ type: "SET_SELECTED", payload:room as Room });
  }, []);

  const clearError = useCallback(()=>{
    dispatch({type:"CLEAR_ERROR"});
  },[])

  return (
    <RoomContext.Provider value={{
      rooms:        state.rooms,
      selectedRoom: state.selectedRoom,
      loading:      state.loading,
      error:        state.error,
      pagination:   state.pagination,
      fetchRooms,
      fetchRoomById,
      createRoom,
      updateRoom,
      deleteRoom,
      setSelected,
      clearError,
    }}>
      {children}
    </RoomContext.Provider>
  )
}

export function useRoom(){
  const context = useContext(RoomContext);
  if(!context){
    throw new Error("useRoom must be used inside room provider!");
  }
  return context;
}