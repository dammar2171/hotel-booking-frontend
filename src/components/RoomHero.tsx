import { useNavigate } from "react-router-dom";

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

interface RoomHeroProps {
  room: Room;
}

export default function RoomHero({ room }: RoomHeroProps) {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: "80px 0",
        background: "var(--color-bg-primary)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">

        <div className="row g-5 align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <div
              className="custom-card"
              style={{
                background: "var(--color-bg-tertiary)",
                height: "420px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "8rem",
              }}
            >
              {room.image}
            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6">

            {/* Rating & Availability */}

            <div className="d-flex align-items-center gap-3 mb-3">

              <span
                style={{
                  color: "#f59e0b",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                ⭐ {room.rating}
              </span>

              {room.is_available ? (
                <span className="badge-available">
                  Available
                </span>
              ) : (
                <span className="badge-booked">
                  Booked
                </span>
              )}

            </div>

            {/* Room Name */}

            <h1
              style={{
                color: "var(--color-text-primary)",
                fontWeight: 800,
                marginBottom: "18px",
              }}
            >
              {room.name}
            </h1>

            {/* Description */}

            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--text-lg)",
                lineHeight: 1.8,
                marginBottom: "28px",
              }}
            >
              {room.description}
            </p>

            {/* Price */}

            <div
              style={{
                marginBottom: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--color-accent)",
                }}
              >
                NPR {room.price.toLocaleString()}
              </span>

              <span
                style={{
                  marginLeft: "8px",
                  color: "var(--color-text-muted)",
                  fontSize: "1rem",
                }}
              >
                / night
              </span>
            </div>

            {/* Quick Features */}

            <div className="row g-3 mb-4">

              <div className="col-6">
                <div className="custom-card p-3 text-center">
                  👥 <br />
                  <strong>2 Guests</strong>
                </div>
              </div>

              <div className="col-6">
                <div className="custom-card p-3 text-center">
                  🛏 <br />
                  <strong>King Bed</strong>
                </div>
              </div>

              <div className="col-6">
                <div className="custom-card p-3 text-center">
                  📐 <br />
                  <strong>450 sq ft</strong>
                </div>
              </div>

              <div className="col-6">
                <div className="custom-card p-3 text-center">
                  🌇 <br />
                  <strong>City View</strong>
                </div>
              </div>
<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{room.amenities.map((item)=>(<span style={{padding:"6px 12px"}}>✅{item}</span>))}</div>
            </div>

            {/* Buttons */}

            <div className="d-flex gap-3 flex-wrap">

              <button
                className="btn-accent"
                disabled={!room.is_available}
                onClick={() => navigate(`/booking/${room.id}`)}
              >
                {room.is_available ? "Book Now" : "Currently Booked"}
              </button>

              <button
                className="btn-ghost"
                onClick={() => navigate("/rooms")}
              >
                ← Back to Rooms
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}