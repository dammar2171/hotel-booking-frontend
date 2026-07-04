// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Card from "../components/ui/Card";

const features = [
  {
    icon:  "🛏️",
    title: "Comfortable Rooms",
    desc:  "Choose from standard, deluxe, and suite rooms tailored to your needs.",
  },
  {
    icon:  "⚡",
    title: "Instant Booking",
    desc:  "Book your room in seconds with our simple and fast booking system.",
  },
  {
    icon:  "🔒",
    title: "Secure Payments",
    desc:  "Your data and transactions are fully protected and encrypted.",
  },
  {
    icon:  "🌟",
    title: "Premium Service",
    desc:  "Experience world-class hospitality with 24/7 guest support.",
  },
];

const roomTypes = [
  {
    icon:       "🏠",
    type:       "Standard Room",
    price:      "NPR 2,000",
    desc:       "Perfect for solo travelers or short stays.",
    features:   ["Free WiFi", "AC", "TV", "Daily Housekeeping"],
  },
  {
    icon:       "✨",
    type:       "Deluxe Room",
    price:      "NPR 5,000",
    desc:       "Spacious room with premium amenities and city view.",
    features:   ["Free WiFi", "AC", "Mini Bar", "King Bed", "City View"],
    popular:    true,
  },
  {
    icon:       "👑",
    type:       "Suite Room",
    price:      "NPR 12,000",
    desc:       "Luxury suite for a truly unforgettable experience.",
    features:   ["Free WiFi", "Jacuzzi", "Living Room", "Butler Service"],
  },
];

const stats = [
  { value: "500+",  label: "Happy Guests" },
  { value: "50+",   label: "Rooms Available" },
  { value: "10+",   label: "Years Experience" },
  { value: "24/7",  label: "Customer Support" },
];

export default function Home() {
  const navigate       = useNavigate();
  const { isLogged }   = useAuth();

  return (
    <>
    <Navbar/>
    <div style={{ background: "var(--color-bg-secondary)" }}>
      {/* ══ HERO ══════════════════════════════ */}
      <section
        style={{
          background:    "var(--color-bg-primary)",
          borderBottom:  "1px solid var(--color-border)",
          padding:       "80px 0 60px",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">

            {/* Left text */}
            <div className="col-lg-6">
              <div style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          "6px",
                background:   "var(--color-accent-light)",
                border:       "1px solid var(--color-accent-border)",
                borderRadius: "var(--radius-full)",
                padding:      "4px 14px",
                fontSize:     "var(--text-sm)",
                color:        "var(--color-accent)",
                fontWeight:   600,
                marginBottom: "20px",
              }}>
                ⭐ Premium Hotel Experience
              </div>

              <h1 style={{
                fontSize:     "clamp(2rem, 5vw, 3rem)",
                fontWeight:   800,
                color:        "var(--color-text-primary)",
                lineHeight:   1.15,
                marginBottom: "20px",
                letterSpacing:"-0.03em",
              }}>
                Your Perfect Stay{" "}
                <span style={{ color: "var(--color-accent)" }}>
                  Starts Here
                </span>
              </h1>

              <p style={{
                fontSize:     "var(--text-lg)",
                color:        "var(--color-text-muted)",
                marginBottom: "36px",
                lineHeight:   1.7,
                maxWidth:     "480px",
              }}>
                Discover luxury and comfort at Hotel Booking System.
                Book your room in minutes and enjoy a world-class experience.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate("/rooms")}
                  style={{
                    background:   "var(--color-accent)",
                    color:        "var(--color-accent-text)",
                    border:       "none",
                    borderRadius: "var(--radius-sm)",
                    padding:      "13px 28px",
                    fontWeight:   600,
                    fontSize:     "var(--text-base)",
                    cursor:       "pointer",
                    transition:   "var(--transition-base)",
                  }}
                >
                  Browse Rooms
                </button>
                {!isLogged && (
                  <button
                    onClick={() => navigate("/register")}
                    style={{
                      background:   "transparent",
                      color:        "var(--color-text-primary)",
                      border:       "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      padding:      "13px 28px",
                      fontWeight:   500,
                      fontSize:     "var(--text-base)",
                      cursor:       "pointer",
                      transition:   "var(--transition-base)",
                    }}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>

            {/* Right visual */}
            <div className="col-lg-6 d-none d-lg-block">
              <div style={{
                background:   "var(--color-bg-tertiary)",
                border:       "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding:      "40px",
                textAlign:    "center",
                position:     "relative",
              }}>
                <div style={{ fontSize: "5rem", marginBottom: "16px" }}>🏨</div>
                <h3 style={{
                  color:        "var(--color-text-primary)",
                  fontWeight:   700,
                  marginBottom: "8px",
                }}>
                  Hotel Booking System
                </h3>
                <p style={{
                  color:        "var(--color-text-muted)",
                  fontSize:     "var(--text-sm)",
                  marginBottom: "24px",
                }}>
                  Comfort meets elegance
                </p>

                {/* Mini stats inside card */}
                <div className="row g-3">
                  {stats.map((s) => (
                    <div key={s.label} className="col-6">
                      <div style={{
                        background:   "var(--color-bg-card)",
                        border:       "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        padding:      "16px 8px",
                      }}>
                        <div style={{
                          fontSize:   "1.5rem",
                          fontWeight: 800,
                          color:      "var(--color-accent)",
                        }}>
                          {s.value}
                        </div>
                        <div style={{
                          fontSize: "var(--text-xs)",
                          color:    "var(--color-text-muted)",
                        }}>
                          {s.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">

          <div className="text-center mb-5">
            <h2 style={{
              fontWeight:   700,
              color:        "var(--color-text-primary)",
              marginBottom: "12px",
            }}>
              Why Choose Us
            </h2>
            <p style={{
              color:    "var(--color-text-muted)",
              fontSize: "var(--text-lg)",
            }}>
              We provide the best hotel experience for every guest
            </p>
          </div>

          <div className="row g-4">
            {features.map((item) => (
              <div key={item.title} className="col-sm-6 col-lg-3">
                <Card item={item}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROOM TYPES ══════════════════════════ */}
      <section
        style={{
          padding:    "80px 0",
          background: "var(--color-bg-primary)",
        }}
      >
        <div className="container">

          <div className="text-center mb-5">
            <h2 style={{
              fontWeight:   700,
              color:        "var(--color-text-primary)",
              marginBottom: "12px",
            }}>
              Our Room Types
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-lg)" }}>
              Find the perfect room for your stay
            </p>
          </div>

          <div className="row g-4">
            {roomTypes.map((room) => (
              <div key={room.type} className="col-md-4">
                <div
                  className="custom-card"
                  style={{
                    padding:   "32px 28px",
                    height:    "100%",
                    position:  "relative",
                    border:    room.popular
                      ? "2px solid var(--color-accent)"
                      : "1px solid var(--color-border)",
                  }}
                >
                  {/* Popular badge */}
                  {room.popular && (
                    <div style={{
                      position:     "absolute",
                      top:          "-12px",
                      left:         "50%",
                      transform:    "translateX(-50%)",
                      background:   "var(--color-accent)",
                      color:        "var(--color-accent-text)",
                      padding:      "3px 16px",
                      borderRadius: "var(--radius-full)",
                      fontSize:     "var(--text-xs)",
                      fontWeight:   600,
                      whiteSpace:   "nowrap",
                    }}>
                      ⭐ Most Popular
                    </div>
                  )}

                  <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                    {room.icon}
                  </div>

                  <h4 style={{
                    fontWeight:   700,
                    color:        "var(--color-text-primary)",
                    marginBottom: "6px",
                  }}>
                    {room.type}
                  </h4>

                  <div style={{
                    fontSize:     "1.5rem",
                    fontWeight:   800,
                    color:        "var(--color-accent)",
                    marginBottom: "8px",
                  }}>
                    {room.price}
                    <span style={{
                      fontSize:   "var(--text-sm)",
                      fontWeight: 400,
                      color:      "var(--color-text-muted)",
                    }}>
                      /night
                    </span>
                  </div>

                  <p style={{
                    color:        "var(--color-text-muted)",
                    fontSize:     "var(--text-sm)",
                    marginBottom: "20px",
                  }}>
                    {room.desc}
                  </p>

                  {/* Features list */}
                  <ul style={{
                    listStyle:    "none",
                    padding:      0,
                    margin:       "0 0 24px",
                  }}>
                    {room.features.map((feat) => (
                      <li
                        key={feat}
                        style={{
                          display:      "flex",
                          alignItems:   "center",
                          gap:          "8px",
                          fontSize:     "var(--text-sm)",
                          color:        "var(--color-text-secondary)",
                          marginBottom: "6px",
                        }}
                      >
                        <span style={{ color: "var(--color-success)" }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate("/rooms")}
                    style={{
                      width:        "100%",
                      padding:      "10px",
                      background:   room.popular
                        ? "var(--color-accent)"
                        : "transparent",
                      color:        room.popular
                        ? "var(--color-accent-text)"
                        : "var(--color-accent)",
                      border:       `1px solid var(--color-accent)`,
                      borderRadius: "var(--radius-sm)",
                      fontWeight:   600,
                      fontSize:     "var(--text-sm)",
                      cursor:       "pointer",
                      transition:   "var(--transition-base)",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              background:   "var(--color-accent)",
              borderRadius: "var(--radius-xl)",
              padding:      "60px 40px",
              textAlign:    "center",
            }}
          >
            <h2 style={{
              color:        "var(--color-accent-text)",
              fontWeight:   800,
              fontSize:     "clamp(1.5rem, 4vw, 2.25rem)",
              marginBottom: "16px",
            }}>
              Ready to Book Your Stay?
            </h2>
            <p style={{
              color:        "rgba(255,255,255,0.85)",
              fontSize:     "var(--text-lg)",
              marginBottom: "32px",
              maxWidth:     "480px",
              margin:       "0 auto 32px",
            }}>
              Join hundreds of happy guests. Book now and get the best rates.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                onClick={() => navigate("/rooms")}
                style={{
                  background:   "var(--color-accent-text)",
                  color:        "var(--color-accent)",
                  border:       "none",
                  borderRadius: "var(--radius-sm)",
                  padding:      "13px 32px",
                  fontWeight:   700,
                  fontSize:     "var(--text-base)",
                  cursor:       "pointer",
                  transition:   "var(--transition-base)",
                }}
              >
                View All Rooms
              </button>
              {!isLogged && (
                <button
                  onClick={() => navigate("/register")}
                  style={{
                    background:   "transparent",
                    color:        "var(--color-accent-text)",
                    border:       "1px solid rgba(255,255,255,0.5)",
                    borderRadius: "var(--radius-sm)",
                    padding:      "13px 32px",
                    fontWeight:   500,
                    fontSize:     "var(--text-base)",
                    cursor:       "pointer",
                    transition:   "var(--transition-base)",
                  }}
                >
                  Register Free
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}