import { useState } from "react";
import type { BookingData } from "../types";
import { useToast } from "../contexts/ToastContext";

interface BookingFormProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
}

export default function BookingForm({bookingData,setBookingData}:BookingFormProps) {
  const {addToast} =useToast();
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  const { name, value } = e.target;

  setBookingData((prev) => ({
    ...prev,
    [name]: name === "guests" ? Number(value) : value,
  }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bookingData);

    addToast("Room booked successfully!","success");
    // Later:
    // axios.post("/api/bookings", bookingData);
  };

  return (
    <div className="custom-card p-4">

      <h3
        style={{
          color: "var(--color-text-primary)",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        Guest Information
      </h3>

      <form onSubmit={handleSubmit}>

        {/* Full Name */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            className="custom-input"
            placeholder="John Doe"
            value={bookingData.fullName}
            onChange={handleChange}
            required
          />

        </div>

        {/* Email */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            className="custom-input"
            placeholder="john@example.com"
            value={bookingData.email}
            onChange={handleChange}
            required
          />

        </div>

        {/* Phone */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            className="custom-input"
            placeholder="+977 98XXXXXXXX"
            value={bookingData.phone}
            onChange={handleChange}
            required
          />

        </div>

        {/* Dates */}

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Check-in
            </label>

            <input
              type="date"
              name="checkIn"
              className="custom-input"
              value={bookingData.checkIn}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Check-out
            </label>

            <input
              type="date"
              name="checkOut"
              className="custom-input"
              value={bookingData.checkOut}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        {/* Guests */}

        <div className="mb-3">

          <label className="form-label fw-semibold">
            Number of Guests
          </label>

          <select
            name="guests"
            className="custom-input"
            value={bookingData.guests}
            onChange={handleChange}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
          </select>

        </div>

        {/* Payment */}

        <div className="mb-4">

          <label className="form-label fw-semibold d-block">
            Payment Method
          </label>

          <div className="form-check">

            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="hotel"
              checked={bookingData.paymentMethod === "hotel"}
              onChange={handleChange}
            />

            <label className="form-check-label">
              Pay at Hotel
            </label>

          </div>

          <div className="form-check">

            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="online"
              checked={bookingData.paymentMethod === "online"}
              onChange={handleChange}
            />

            <label className="form-check-label">
              Online Payment
            </label>

          </div>

        </div>

        {/* Special Request */}

        <div className="mb-4">

          <label className="form-label fw-semibold">
            Special Requests
          </label>

          <textarea
            rows={5}
            name="specialRequest"
            className="custom-input"
            placeholder="Any special requests?"
            value={bookingData.specialRequest}
            onChange={handleChange}
          />

        </div>

        {/* Button */}

        <button
          type="submit"
          className="btn-accent w-100"
        >
          Confirm Booking
        </button>

      </form>

    </div>
  );
}