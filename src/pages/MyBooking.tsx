import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import MiniCard from "../components/ui/MiniCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

interface Summary{
    label:string;
    value:string;
    icon:string;
    color:string;
    bg:string;
  }

interface Booking {
  id:          number;
  guest_id:    number;
  room_id:     number;
  check_in:    string;
  check_out:   string;
  total_price: number;
  status:      "confirmed" | "cancelled" | "pending";
}

interface Room {
  id:          number;
  room_number: string;
  type:        string;
  price:       number;
}

const statusStyles = {
  confirmed: {
    bg:     "var(--color-success-bg)",
    color:  "var(--color-success-text)",
    border: "var(--color-success-border)",
    icon:   "✅",
  },
  cancelled: {
    bg:     "var(--color-danger-bg)",
    color:  "var(--color-danger-text)",
    border: "var(--color-danger-border)",
    icon:   "❌",
  },
  pending: {
    bg:     "var(--color-warning-bg)",
    color:  "var(--color-warning-text)",
    border: "var(--color-warning-border)",
    icon:   "⏳",
  },
};

export default function MyBookings() {
  const { user }             = useAuth();
  const { addToast }         = useToast();
  const navigate             = useNavigate();
  const [bookings,     setBookings]     = useState<Booking[]>([]);
  const [rooms,        setRooms]        = useState<Room[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [cancelId,     setCancelId]     = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "cancelled" | "pending">("all");
  const [activeView,   setActiveView]   = useState<"grid" | "table">("grid");
  
  // ── Fetch bookings ───────────────────────
  const fetchData = async () => {
    try {
      setLoading(true);

      const guestRes = await api.get(`/guests/user/${user?.id}`);
      const guest_id = guestRes.data.data.id;

      const [bookRes, roomRes] = await Promise.all([
        api.get(`/bookings/guest/${guest_id}`),
        api.get("/rooms?limit=100"),
      ]);
      setBookings(bookRes.data.data ?? []);
      setRooms(roomRes.data.data    ?? []);
    } catch {
      addToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Helpers ──────────────────────────────
  const getRoom = (id: number) =>
    rooms.find((r) => r.id === id);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    });

  const getNights = (checkIn: string, checkOut: string) =>
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
    );

  // ── Cancel ───────────────────────────────
  const handleCancel = async (id: number) => {
    try {
      await api.put(`/bookings/${id}/cancel`);
      addToast("Booking cancelled successfully!", "success");
      setCancelId(null);
      fetchData();
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Cancel failed",
        "error"
      );
    }
  };

  // ── Filter ───────────────────────────────
  const filtered = bookings.filter((b) =>
    filterStatus === "all" ? true : b.status === filterStatus
  );

  // ── Summary counts ───────────────────────
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const totalSpent = Number(
  bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + Number(b.total_price), 0)
    .toFixed(2)
);


  return (
    <div style={{
      background: "var(--color-bg-secondary)",
      minHeight:  "100vh",
      padding:    "40px 0",
    }}>
      <div className="container">

        {/* ── Page Header ──────────────────── */}
        <div style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          marginBottom:   "32px",
          flexWrap:       "wrap",
          gap:            "12px",
        }}>
          <div>
            <h2 style={{
              fontWeight: 700,
              color:      "var(--color-text-primary)",
              margin:     0,
            }}>
              My Bookings
            </h2>
            <p style={{
              color:     "var(--color-text-muted)",
              fontSize:  "var(--text-sm)",
              marginTop: "4px",
            }}>
              All your reservations in one place
            </p>
          </div>
          <button
            onClick={() => navigate("/rooms")}
            style={{
              background:   "var(--color-accent)",
              color:        "var(--color-accent-text)",
              border:       "none",
              borderRadius: "var(--radius-sm)",
              padding:      "10px 20px",
              fontWeight:   600,
              fontSize:     "var(--text-sm)",
              cursor:       "pointer",
            }}
          >
            + New Booking
          </button>
        </div>

        {/* ── Summary Cards ────────────────── */}
        <div className="row g-3 mb-4">
          {[
            {
              label: "Total Bookings",
              value: bookings.length,
              icon:  "📋",
              color: "var(--color-accent)",
              bg:    "var(--color-accent-light)",
            },
            {
              label: "Confirmed",
              value: confirmed,
              icon:  "✅",
              color: "var(--color-success-text)",
              bg:    "var(--color-success-bg)",
            },
            {
              label: "Cancelled",
              value: cancelled,
              icon:  "❌",
              color: "var(--color-danger-text)",
              bg:    "var(--color-danger-bg)",
            },
            {
              label: "Total Spent",
              value: `NPR ${totalSpent.toLocaleString()}`,
              icon:  "💰",
              color: "var(--color-warning-text)",
              bg:    "var(--color-warning-bg)",
            },
          ].map((summary) => (
            <div key={summary.label} className="col-sm-6 col-lg-3">
             <MiniCard summary={summary}/>
            </div>
          ))}
        </div>

        {/* ── Filter + View Toggle ─────────── */}
        <div style={{
          background:   "var(--color-bg-card)",
          border:       "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding:      "14px 20px",
          marginBottom: "20px",
          display:      "flex",
          alignItems:   "center",
          justifyContent:"space-between",
          gap:          "12px",
          flexWrap:     "wrap",
        }}>
          {/* Status filter pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {(["all", "confirmed", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding:      "6px 14px",
                  borderRadius: "var(--radius-full)",
                  border:       filterStatus === s
                    ? "none"
                    : "1px solid var(--color-border)",
                  background:   filterStatus === s
                    ? "var(--color-accent)"
                    : "transparent",
                  color:        filterStatus === s
                    ? "var(--color-accent-text)"
                    : "var(--color-text-secondary)",
                  fontWeight:   filterStatus === s ? 600 : 400,
                  fontSize:     "var(--text-xs)",
                  cursor:       "pointer",
                  textTransform:"capitalize",
                  transition:   "var(--transition-fast)",
                }}
              >
                {s === "all" ? `All (${bookings.length})` : s}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{
            display:      "flex",
            background:   "var(--color-bg-tertiary)",
            borderRadius: "var(--radius-sm)",
            padding:      "3px",
            border:       "1px solid var(--color-border)",
          }}>
            {(["grid", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                style={{
                  padding:      "6px 12px",
                  background:   activeView === v
                    ? "var(--color-bg-card)"
                    : "transparent",
                  border:       "none",
                  borderRadius: "var(--radius-sm)",
                  cursor:       "pointer",
                  color:        activeView === v
                    ? "var(--color-text-primary)"
                    : "var(--color-text-muted)",
                  fontSize:     "0.9rem",
                  transition:   "var(--transition-fast)",
                  boxShadow:    activeView === v
                    ? "var(--shadow-xs)"
                    : "none",
                }}
              >
                {v === "grid" ? "⊞" : "☰"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading ───────────────────────── */}
        {loading && (
          <LoadingSpinner/>
        )}

        {/* ── Empty State ───────────────────── */}
        {!loading && filtered.length === 0 && (
          <div style={{
            background:   "var(--color-bg-card)",
            border:       "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding:      "60px 24px",
            textAlign:    "center",
            boxShadow:    "var(--shadow-card)",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛏️</div>
            <h4 style={{
              fontWeight:   700,
              color:        "var(--color-text-primary)",
              marginBottom: "8px",
            }}>
              No bookings found
            </h4>
            <p style={{
              color:        "var(--color-text-muted)",
              fontSize:     "var(--text-sm)",
              marginBottom: "24px",
            }}>
              {filterStatus === "all"
                ? "You haven't made any bookings yet."
                : `No ${filterStatus} bookings found.`}
            </p>
            <button
              onClick={() => navigate("/rooms")}
              style={{
                background:   "var(--color-accent)",
                border:       "none",
                borderRadius: "var(--radius-sm)",
                padding:      "11px 28px",
                cursor:       "pointer",
                color:        "var(--color-accent-text)",
                fontWeight:   600,
                fontSize:     "var(--text-sm)",
              }}
            >
              Browse Rooms
            </button>
          </div>
        )}

        {/* ══ GRID VIEW ═══════════════════════ */}
        {!loading && filtered.length > 0 && activeView === "grid" && (
          <div className="row g-4">
            {filtered.map((booking) => {
              const room   = getRoom(booking.room_id);
              const ss     = statusStyles[booking.status];
              const nights = getNights(booking.check_in, booking.check_out);

              return (
                <div key={booking.id} className="col-md-6 col-xl-4">
                  <div style={{
                    background:   "var(--color-bg-card)",
                    border:       "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    overflow:     "hidden",
                    boxShadow:    "var(--shadow-card)",
                    transition:   "var(--transition-base)",
                    height:       "100%",
                    display:      "flex",
                    flexDirection:"column",
                  }}>

                    {/* Card top accent bar */}
                    <div style={{
                      height:     "4px",
                      background: booking.status === "confirmed"
                        ? "var(--color-success)"
                        : booking.status === "cancelled"
                          ? "var(--color-danger)"
                          : "var(--color-warning)",
                    }} />

                    {/* Card header */}
                    <div style={{
                      padding:        "16px 20px",
                      borderBottom:   "1px solid var(--color-border)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "space-between",
                      background:     "var(--color-bg-tertiary)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width:         "38px",
                          height:        "38px",
                          borderRadius:  "var(--radius-sm)",
                          background:    "var(--color-accent-light)",
                          border:        "1px solid var(--color-accent-border)",
                          display:       "flex",
                          alignItems:    "center",
                          justifyContent:"center",
                          fontSize:      "1.1rem",
                        }}>
                          🛏️
                        </div>
                        <div>
                          <div style={{
                            fontWeight: 700,
                            color:      "var(--color-text-primary)",
                            fontSize:   "var(--text-sm)",
                          }}>
                            Room {room?.room_number ?? booking.room_id}
                          </div>
                          <div style={{
                            color:          "var(--color-text-muted)",
                            fontSize:       "var(--text-xs)",
                            textTransform:  "capitalize",
                          }}>
                            {room?.type ?? "—"}
                          </div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span style={{
                        background:   ss.bg,
                        color:        ss.color,
                        border:       `1px solid ${ss.border}`,
                        padding:      "4px 10px",
                        borderRadius: "var(--radius-full)",
                        fontSize:     "var(--text-xs)",
                        fontWeight:   600,
                        textTransform:"capitalize",
                        whiteSpace:   "nowrap",
                      }}>
                        {ss.icon} {booking.status}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "20px", flex: 1 }}>

                      {/* Date row */}
                      <div style={{
                        display:   "flex",
                        gap:       "12px",
                        marginBottom: "16px",
                      }}>
                        <div style={{
                          flex:         1,
                          background:   "var(--color-bg-tertiary)",
                          border:       "1px solid var(--color-border)",
                          borderRadius: "var(--radius-sm)",
                          padding:      "10px 12px",
                        }}>
                          <div style={{
                            fontSize:  "var(--text-xs)",
                            color:     "var(--color-text-muted)",
                            marginBottom:"3px",
                          }}>
                            Check In
                          </div>
                          <div style={{
                            fontWeight: 600,
                            color:      "var(--color-text-primary)",
                            fontSize:   "var(--text-sm)",
                          }}>
                            {formatDate(booking.check_in)}
                          </div>
                        </div>
                        <div style={{
                          display:       "flex",
                          alignItems:    "center",
                          color:         "var(--color-text-muted)",
                          fontSize:      "var(--text-xs)",
                          flexDirection: "column",
                          justifyContent:"center",
                          gap:           "2px",
                        }}>
                          <span>→</span>
                          <span style={{ fontSize: "10px" }}>{nights}n</span>
                        </div>
                        <div style={{
                          flex:         1,
                          background:   "var(--color-bg-tertiary)",
                          border:       "1px solid var(--color-border)",
                          borderRadius: "var(--radius-sm)",
                          padding:      "10px 12px",
                        }}>
                          <div style={{
                            fontSize:  "var(--text-xs)",
                            color:     "var(--color-text-muted)",
                            marginBottom:"3px",
                          }}>
                            Check Out
                          </div>
                          <div style={{
                            fontWeight: 600,
                            color:      "var(--color-text-primary)",
                            fontSize:   "var(--text-sm)",
                          }}>
                            {formatDate(booking.check_out)}
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      {[
                        {
                          label: "Duration",
                          value: `${nights} night${nights > 1 ? "s" : ""}`,
                          icon:  "🌙",
                        },
                        {
                          label: "Price/Night",
                          value: `NPR ${room?.price.toLocaleString() ?? "—"}`,
                          icon:  "💵",
                        },
                        {
                          label: "Total Paid",
                          value: `NPR ${booking.total_price.toLocaleString()}`,
                          icon:  "💰",
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          style={{
                            display:        "flex",
                            justifyContent: "space-between",
                            alignItems:     "center",
                            padding:        "7px 0",
                            borderBottom:   "1px solid var(--color-border)",
                          }}
                        >
                          <span style={{
                            display:    "flex",
                            alignItems: "center",
                            gap:        "6px",
                            fontSize:   "var(--text-xs)",
                            color:      "var(--color-text-muted)",
                          }}>
                            {row.icon} {row.label}
                          </span>
                          <span style={{
                            fontSize:  "var(--text-sm)",
                            fontWeight: 600,
                            color:     "var(--color-text-primary)",
                          }}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Card footer */}
                    {booking.status === "confirmed" && (
                      <div style={{
                        padding:   "14px 20px",
                        borderTop: "1px solid var(--color-border)",
                        background:"var(--color-bg-tertiary)",
                      }}>
                        <button
                          onClick={() => setCancelId(booking.id)}
                          style={{
                            width:        "100%",
                            padding:      "9px",
                            background:   "var(--color-danger-bg)",
                            border:       "1px solid var(--color-danger-border)",
                            borderRadius: "var(--radius-sm)",
                            cursor:       "pointer",
                            color:        "var(--color-danger-text)",
                            fontWeight:   600,
                            fontSize:     "var(--text-xs)",
                            transition:   "var(--transition-fast)",
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ TABLE VIEW ══════════════════════ */}
        {!loading && filtered.length > 0 && activeView === "table" && (
          <div style={{
            background:   "var(--color-bg-card)",
            border:       "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            overflow:     "hidden",
            boxShadow:    "var(--shadow-card)",
          }}>
            <div style={{ overflowX: "auto" }}>
              <table className="custom-table w-100">
                <thead>
                  <tr>
                    {["#", "Room", "Check In", "Check Out", "Nights", "Total", "Status", "Action"]
                      .map((h) => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking, index) => {
                    const room   = getRoom(booking.room_id);
                    const ss     = statusStyles[booking.status];
                    const nights = getNights(booking.check_in, booking.check_out);

                    return (
                      <tr key={booking.id}>
                        <td style={{ color: "var(--color-text-muted)" }}>
                          {index + 1}
                        </td>
                        <td>
                          <div>
                            <div style={{
                              fontWeight: 600,
                              color:      "var(--color-text-primary)",
                              fontSize:   "var(--text-sm)",
                            }}>
                              Room {room?.room_number ?? booking.room_id}
                            </div>
                            <div style={{
                              color:         "var(--color-text-muted)",
                              fontSize:      "var(--text-xs)",
                              textTransform: "capitalize",
                            }}>
                              {room?.type ?? "—"}
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                          {formatDate(booking.check_in)}
                        </td>
                        <td style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                          {formatDate(booking.check_out)}
                        </td>
                        <td style={{
                          fontSize:  "var(--text-sm)",
                          fontWeight: 600,
                          color:     "var(--color-text-primary)",
                        }}>
                          {nights}
                        </td>
                        <td style={{
                          fontWeight: 700,
                          color:      "var(--color-accent)",
                          fontSize:   "var(--text-sm)",
                        }}>
                          NPR {booking.total_price.toLocaleString()}
                        </td>
                        <td>
                          <span style={{
                            background:   ss.bg,
                            color:        ss.color,
                            border:       `1px solid ${ss.border}`,
                            padding:      "4px 10px",
                            borderRadius: "var(--radius-full)",
                            fontSize:     "var(--text-xs)",
                            fontWeight:   600,
                            textTransform:"capitalize",
                            whiteSpace:   "nowrap",
                          }}>
                            {ss.icon} {booking.status}
                          </span>
                        </td>
                        <td>
                          {booking.status === "confirmed" ? (
                            <button
                              onClick={() => setCancelId(booking.id)}
                              style={{
                                background:   "var(--color-danger-bg)",
                                border:       "1px solid var(--color-danger-border)",
                                borderRadius: "var(--radius-sm)",
                                padding:      "6px 14px",
                                cursor:       "pointer",
                                color:        "var(--color-danger-text)",
                                fontSize:     "var(--text-xs)",
                                fontWeight:   600,
                                whiteSpace:   "nowrap",
                              }}
                            >
                              Cancel
                            </button>
                          ) : (
                            <span style={{
                              color:    "var(--color-text-muted)",
                              fontSize: "var(--text-xs)",
                            }}>
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ══ CANCEL CONFIRM MODAL ════════════ */}
      {cancelId !== null && (
        <div
          onClick={() => setCancelId(null)}
          style={{
            position:       "fixed",
            inset:          0,
            background:     "var(--color-bg-overlay)",
            zIndex:         1000,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:        "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background:   "var(--color-bg-card)",
              border:       "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              width:        "100%",
              maxWidth:     "380px",
              boxShadow:    "var(--shadow-xl)",
              overflow:     "hidden",
            }}
          >
            <div style={{ padding: "32px 28px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⚠️</div>
              <h5 style={{
                fontWeight:   700,
                color:        "var(--color-text-primary)",
                marginBottom: "8px",
              }}>
                Cancel Booking?
              </h5>
              <p style={{
                color:        "var(--color-text-muted)",
                fontSize:     "var(--text-sm)",
                marginBottom: "6px",
              }}>
                Are you sure you want to cancel this booking?
              </p>
              <p style={{
                color:        "var(--color-success)",
                fontSize:     "var(--text-xs)",
                fontWeight:   500,
                marginBottom: "24px",
              }}>
                ✅ The room will become available again
              </p>
              <div style={{
                display:        "flex",
                gap:            "10px",
                justifyContent: "center",
              }}>
                <button
                  onClick={() => setCancelId(null)}
                  style={{
                    background:   "transparent",
                    border:       "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding:      "9px 24px",
                    cursor:       "pointer",
                    color:        "var(--color-text-secondary)",
                    fontWeight:   500,
                    fontSize:     "var(--text-sm)",
                  }}
                >
                  Keep It
                </button>
                <button
                  onClick={() => handleCancel(cancelId)}
                  style={{
                    background:   "var(--color-danger)",
                    border:       "none",
                    borderRadius: "var(--radius-sm)",
                    padding:      "9px 24px",
                    cursor:       "pointer",
                    color:        "#ffffff",
                    fontWeight:   600,
                    fontSize:     "var(--text-sm)",
                  }}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}