import type { BookingData } from '../types';

interface Room {
  id: number;
  name: string;
  price: number;
  rating: number;
  is_available: boolean;
  description: string;
  amenities: string[];
  image: string;
}

interface BookingSummaryProps {
  room: Room;
  bookingData: BookingData;
}

export default function BookingSummary({
  room,
  bookingData,
}: BookingSummaryProps) {
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;

    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);

    const diff = end.getTime() - start.getTime();

    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const nights = calculateNights();

  const total = nights * room.price;

  return (
    <div
      className="custom-card"
      style={{
        padding: '24px',
        position: 'sticky',
        top: '100px',
      }}
    >
      {/* Heading */}

      <h3
        style={{
          color: 'var(--color-text-primary)',
          fontWeight: 700,
          marginBottom: '24px',
        }}
      >
        Booking Summary
      </h3>

      {/* Room */}

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '90px',
            height: '90px',
            background: 'var(--color-bg-tertiary)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3rem',
          }}
        >
          {room.image}
        </div>

        <div>
          <h5
            style={{
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            {room.name}
          </h5>

          <p
            style={{
              marginBottom: '4px',
              color: '#f59e0b',
            }}
          >
            ⭐ {room.rating}
          </p>

          <p
            style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
            }}
          >
            NPR {room.price.toLocaleString()} / night
          </p>
        </div>
      </div>

      <hr />

      {/* Booking Details */}

      <div className="d-flex justify-content-between mb-3">
        <span>Check-in</span>
        <strong>{bookingData.checkIn || '--/--/----'}</strong>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span>Check-out</span>
        <strong>{bookingData.checkOut || '--/--/----'}</strong>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span>Guests</span>
        <strong>{bookingData.guests}</strong>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span>Price / Night</span>
        <strong>NPR {room.price.toLocaleString()}</strong>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span>Total Nights</span>
        <strong>{nights}</strong>
      </div>

      <hr />

      {/* Total */}

      <div className="d-flex justify-content-between align-items-center">
        <h4
          style={{
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          Total
        </h4>

        <h3
          style={{
            color: 'var(--color-accent)',
            margin: 0,
            fontWeight: 700,
          }}
        >
          NPR {total.toLocaleString()}
        </h3>
      </div>

      {/* Info */}

      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          borderRadius: '12px',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <small
          style={{
            color: 'var(--color-text-muted)',
          }}
        >
          ✔ Free cancellation within 24 hours.
          <br />
          ✔ No hidden charges.
          <br />✔ Secure booking process.
        </small>
      </div>
    </div>
  );
}
