export interface Room {
  id:           number;
  name:         string;
  price:        number;
  rating:       number;
  is_available: boolean;
  description:string;
  amenities:string[];
  image:string;
}

export interface Guest {
  id:    number;
  name:  string;
  email: string;
  phone: string;
}

export interface Booking {
  id:          number;
  guest_id:    number;
  room_id:     number;
  check_in:    string;
  check_out:   string;
  total_price: number;
  status:      "confirmed" | "cancelled" | "pending";
}

export interface User {
  id:    number;
  name:  string;
  email: string;
  role:  "admin" | "user";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data:    T[];
  pagination: {
    currentPage: number;
    totalPages:  number;
    totalItems:  number;
    limit:       number;
  };
}

export interface Stats {
  totalRooms:        number;
  availableRooms:    number;
  occupiedRooms:     number;
  totalGuests:       number;
  totalBookings:     number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue:      number;
  occupancyRate:     number;
  topBookingRoom:    string;
}

export interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentMethod: "hotel" | "online";
  specialRequest: string;
}

export interface UserRegisterData{
  name:string;
  email:string;
  password:string;
  confirmPsd:string;
}
export interface LoginData{
  email:string;
  password:string;
}