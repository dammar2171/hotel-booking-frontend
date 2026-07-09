import { useNavigate } from "react-router-dom";
import type { Room } from "../types";

interface RoomCardProps {
  room: Room ;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6">
      <div
        className="custom-card h-100 d-flex flex-column"
        style={{
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div style={{ height: "220px", overflow: "hidden" }}>
          {room.image_url ? (
            <img
              src={room.image_url}
              alt={room.type}
              style={{
                width:      "100%",
                height:     "100%",
                objectFit:  "cover",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div style={{
              height:         "100%",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "4rem",
            }}>
              🛏️
            </div>
          )}
      </div>

        {/* Body */}
        <div
          style={{
            padding: "24px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Rating + Status */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <span
              style={{
                color: "#f59e0b",
                fontWeight: 600,
              }}
            >
              ⭐ {room.rating ?? "N/A"}
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

          {/* Type */}

          <h4
            style={{
              color: "var(--color-text-primary)",
              fontWeight: 700,
            }}
          >
            {room.type}
          </h4>

          {/* Description */}

          <p
            style={{
              color: "var(--color-text-muted)",
              marginTop: "10px",
            }}
          >
            {room.description}
          </p>

          {/* Amenities */}

          <div className="mt-3">

            <h6
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              Amenities
            </h6>

            <ul
              className="list-unstyled"
              style={{
                marginBottom: 0,
              }}
            >
              {room.amenities?.map((item) => (
                <li
                  key={item}
                  style={{
                    marginBottom: "6px",
                    color: "var(--color-text-secondary)",
                    fontSize: "14px",
                  }}
                >
                  ✅ {item}
                </li>
              ))}
            </ul>

          </div>

          {/* Price */}

          <div
            className="mt-4"
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--color-accent)",
            }}
          >
            NPR {room.price.toLocaleString()}

            <span
              style={{
                fontSize: "14px",
                color: "var(--color-text-muted)",
                fontWeight: 400,
              }}
            >
              {" "}
              / night
            </span>

          </div>

          {/* Buttons */}

          <div className="d-flex gap-2 mt-4">

            <button
              className="btn-ghost flex-fill"
              onClick={() => navigate(`/rooms/${room.id}`)}
            >
              View Details
            </button>

            <button
              className="btn-accent flex-fill"
              disabled={!room.is_available}
              onClick={() => navigate(`/booking/${room.id}`)}
            >
              {room.is_available ? "Book Now" : "Booked"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;