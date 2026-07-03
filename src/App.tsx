import { BrowserRouter, Navigate, Route } from 'react-router';
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


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
              </Routes>
          </>
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
