export interface Room {
  id:           number;
  room_number:  string;
  type:         string;
  price:        number;
  is_available: boolean;
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
