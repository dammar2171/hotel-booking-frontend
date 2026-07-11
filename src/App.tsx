import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ToastProvider from './contexts/ToastContext';
import Dashboard from './pages/Admin/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import RoomDetail from './pages/RoomDetail';
import Booking from './pages/Booking';
import DashboardStats from './pages/Admin/DashboardStats';
import ManageRooms from './pages/Admin/ManageRooms';
import ManageGuests from './pages/Admin/ManageGuests';
import ManageBookings from './pages/Admin/ManageBooking';
import StatsPage from './pages/Admin/StatsPage';
import Settings from './pages/Admin/Settings';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import MyBookings from './pages/MyBooking';
import Room from './pages/RoomPage';
import { RoomProvider } from './contexts/RoomContext';
import ManageContacts from './pages/Admin/ManageContacts';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();
  return isLogged ? <>{children}</> : <Navigate to={'/login'} />;
};

const ProtectedAdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to={'/'} />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/rooms" element={<Room />}></Route>
        <Route path="/rooms/:id" element={<RoomDetail />}></Route>
        <Route path="/booking/:id" element={<Booking />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/settings" element={<Setting />}></Route>
        <Route path="/my-bookings" element={<MyBookings />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoutes>
              <Dashboard />
            </ProtectedAdminRoutes>
          }
        >
          <Route index element={<DashboardStats />}></Route>
          <Route path="rooms" element={<ManageRooms />}></Route>
          <Route path="guests" element={<ManageGuests />}></Route>
          <Route path="bookings" element={<ManageBookings />}></Route>
          <Route path="contacts" element={<ManageContacts />}></Route>
          <Route path="stats" element={<StatsPage />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <RoomProvider>
            <BrowserRouter>
              <AppRoutes></AppRoutes>
            </BrowserRouter>
          </RoomProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
