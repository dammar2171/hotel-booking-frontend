import { BrowserRouter, Navigate, Route } from 'react-router';
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ToastProvider from './contexts/ToastContext';
import Dashboard from './pages/Admin/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import RoomDetail from './pages/RoomDetail';
import Room from './pages/Room';
import Booking from './pages/Booking';


const ProtectedRoutes =({children}:{children:React.ReactNode})=>{
    const {isLogged} = useAuth();
    return isLogged ? <>{children}</> : <Navigate to={"/login"}/>
}

const ProtectedAdminRoutes =({children}:{children:React.ReactNode})=>{
    const {isAdmin} = useAuth();
    return isAdmin ? <>{children}</> : <Navigate to={"/"}/>
}

const AppRoutes=()=>{
  return <>
              <Routes>
                  <Route path='/' element= {<Home/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/register' element={<Register/>}></Route>
                  <Route path='/admin' element={<Dashboard/>}></Route>
                  <Route path='/about' element={<About/>}></Route>
                  <Route path='/contact' element={<Contact/>}></Route>
                  <Route path='/rooms' element={<Room/>}></Route>
                  <Route path='/rooms/roomDetails' element={<RoomDetail/>}></Route>
                  <Route path='/booking' element={<Booking/>}></Route>
              </Routes>
          </>
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
