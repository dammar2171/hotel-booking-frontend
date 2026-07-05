import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useToast } from "../../contexts/ToastContext";

interface Room {
  id:           number;
  room_number:  string;
  type:         string;
  price:        number;
  is_available: boolean;
}

interface RoomForm {
  room_number: string;
  type:        string;
  price:       string;
  is_available: boolean;
}

const emptyForm: RoomForm = {
  room_number:  "",
  type:         "",
  price:        "",
  is_available: true,
};

const roomTypes = ["standard", "deluxe", "suite", "family", "penthouse"];

export default function ManageRooms() {
  const { addToast }                    = useToast();
  const [rooms,      setRooms]          = useState<Room[]>([]);
  const [loading,    setLoading]        = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const [showModal,  setShowModal]      = useState(false);
  const [editRoom,   setEditRoom]       = useState<Room | null>(null);
  const [form,       setForm]           = useState<RoomForm>(emptyForm);
  const [deleteId,   setDeleteId]       = useState<number | null>(null);
  const [search,     setSearch]         = useState("");
  const [filterType, setFilterType]     = useState("all");

  // ── Fetch rooms ──────────────────────────
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/rooms?limit=100");
      setRooms(res.data.data);
    } catch {
      addToast("Failed to load rooms", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  // ── Open modal ───────────────────────────
  const openCreate = () => {
    setEditRoom(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (room: Room) => {
    setEditRoom(room);
    setForm({
      room_number:  room.room_number,
      type:         room.type,
      price:        String(room.price),
      is_available: room.is_available,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditRoom(null);
    setForm(emptyForm);
  };

  // ── Handle form change ───────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  // ── Submit create / update ───────────────
  const handleSubmit = async () => {
    if (!form.room_number || !form.type || !form.price) {
      addToast("All fields are required", "error");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        room_number:  form.room_number,
        type:         form.type,
        price:        Number(form.price),
        is_available: form.is_available,
      };

      if (editRoom) {
        await api.put(`/rooms/${editRoom.id}`, payload);
        addToast("Room updated successfully!", "success");
      } else {
        await api.post("/rooms", payload);
        addToast("Room created successfully!", "success");
      }

      closeModal();
      fetchRooms();
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ───────────────────────────────
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/rooms/${id}`);
      addToast("Room deleted successfully!", "success");
      setDeleteId(null);
      fetchRooms();
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Delete failed",
        "error"
      );
    }
  };

  // ── Filter rooms ─────────────────────────
  const filtered = rooms.filter((r) => {
    const matchSearch = r.room_number
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    return matchSearch && matchType;
  });

  // ── Stats summary ────────────────────────
  const totalRooms     = rooms.length;
  const availableRooms = rooms.filter((r) => r.is_available).length;
  const occupiedRooms  = rooms.filter((r) => !r.is_available).length;

  return (
    <div>

      {/* ── Page Header ──────────────────── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginBottom:   "28px",
        flexWrap:       "wrap",
        gap:            "12px",
      }}>
        <div>
          <h2 style={{
            fontWeight: 700,
            color:      "var(--color-text-primary)",
            margin:     0,
          }}>
            Manage Rooms
          </h2>
          <p style={{
            color:     "var(--color-text-muted)",
            fontSize:  "var(--text-sm)",
            marginTop: "4px",
          }}>
            Add, edit and manage all hotel rooms
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            background:   "var(--color-accent)",
            color:        "var(--color-accent-text)",
            border:       "none",
            borderRadius: "var(--radius-sm)",
            padding:      "10px 20px",
            fontWeight:   600,
            fontSize:     "var(--text-sm)",
            cursor:       "pointer",
            display:      "flex",
            alignItems:   "center",
            gap:          "8px",
            transition:   "var(--transition-fast)",
          }}
        >
          + Add New Room
        </button>
      </div>

      {/* ── Summary Cards ────────────────── */}
      <div className="row g-3 mb-4">
        {[
          {
            label: "Total Rooms",
            value: totalRooms,
            icon:  "🛏️",
            color: "var(--color-info-text)",
            bg:    "var(--color-info-bg)",
          },
          {
            label: "Available",
            value: availableRooms,
            icon:  "✅",
            color: "var(--color-success-text)",
            bg:    "var(--color-success-bg)",
          },
          {
            label: "Occupied",
            value: occupiedRooms,
            icon:  "🔒",
            color: "var(--color-warning-text)",
            bg:    "var(--color-warning-bg)",
          },
        ].map((s) => (
          <div key={s.label} className="col-sm-4">
            <div style={{
              background:   "var(--color-bg-card)",
              border:       "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding:      "20px",
              display:      "flex",
              alignItems:   "center",
              gap:          "16px",
            }}>
              <div style={{
                width:        "48px",
                height:       "48px",
                borderRadius: "var(--radius-md)",
                background:   s.bg,
                display:      "flex",
                alignItems:   "center",
                justifyContent:"center",
                fontSize:     "1.4rem",
                flexShrink:   0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{
                  fontSize:   "1.5rem",
                  fontWeight: 800,
                  color:      s.color,
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: "var(--text-xs)",
                  color:    "var(--color-text-muted)",
                  marginTop:"4px",
                }}>
                  {s.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + Filter ──────────────── */}
      <div style={{
        background:   "var(--color-bg-card)",
        border:       "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding:      "16px 20px",
        marginBottom: "16px",
        display:      "flex",
        gap:          "12px",
        flexWrap:     "wrap",
        alignItems:   "center",
      }}>
        <input
          type="text"
          placeholder="🔍 Search by room number or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input"
          style={{ flex: 1, minWidth: "200px" }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="custom-input"
          style={{ width: "160px" }}
        >
          <option value="all">All Types</option>
          {roomTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ── Table ────────────────────────── */}
      <div style={{
        background:   "var(--color-bg-card)",
        border:       "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow:     "hidden",
        boxShadow:    "var(--shadow-card)",
      }}>

        {loading ? (
          <div className="loading-wrapper">
            <div
              className="spinner-border"
              style={{ color: "var(--color-accent)" }}
              role="status"
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>🛏️</div>
            <h4>No rooms found</h4>
            <p style={{ color: "var(--color-text-muted)" }}>
              Try adjusting your search or add a new room
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="custom-table w-100">
              <thead>
                <tr>
                  {["#", "Room No.", "Type", "Price/Night", "Status", "Actions"]
                    .map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((room, index) => (
                  <tr key={room.id}>
                    <td style={{ color: "var(--color-text-muted)" }}>
                      {index + 1}
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {room.room_number}
                    </td>
                    <td>
                      <span style={{
                        background:   "var(--color-bg-tertiary)",
                        border:       "1px solid var(--color-border)",
                        borderRadius: "var(--radius-full)",
                        padding:      "3px 10px",
                        fontSize:     "var(--text-xs)",
                        fontWeight:   600,
                        color:        "var(--color-text-secondary)",
                        textTransform:"capitalize",
                      }}>
                        {room.type}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--color-accent)" }}>
                      NPR {room.price.toLocaleString()}
                    </td>
                    <td>
                      <span className={
                        room.is_available
                          ? "badge-available"
                          : "badge-booked"
                      }>
                        {room.is_available ? "Available" : "Occupied"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {/* Edit */}
                        <button
                          onClick={() => openEdit(room)}
                          style={{
                            background:   "var(--color-info-bg)",
                            border:       "1px solid var(--color-info-border)",
                            borderRadius: "var(--radius-sm)",
                            padding:      "6px 14px",
                            cursor:       "pointer",
                            color:        "var(--color-info-text)",
                            fontSize:     "var(--text-xs)",
                            fontWeight:   600,
                            transition:   "var(--transition-fast)",
                          }}
                        >
                          ✏️ Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteId(room.id)}
                          style={{
                            background:   "var(--color-danger-bg)",
                            border:       "1px solid var(--color-danger-border)",
                            borderRadius: "var(--radius-sm)",
                            padding:      "6px 14px",
                            cursor:       "pointer",
                            color:        "var(--color-danger-text)",
                            fontSize:     "var(--text-xs)",
                            fontWeight:   600,
                            transition:   "var(--transition-fast)",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ══ CREATE / EDIT MODAL ══════════════ */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position:        "fixed",
            inset:           0,
            background:      "var(--color-bg-overlay)",
            zIndex:          "var(--z-modal)",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            padding:         "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background:   "var(--color-bg-card)",
              border:       "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              width:        "100%",
              maxWidth:     "480px",
              boxShadow:    "var(--shadow-xl)",
              overflow:     "hidden",
            }}
          >
            {/* Modal header */}
            <div style={{
              padding:       "20px 24px",
              borderBottom:  "1px solid var(--color-border)",
              display:       "flex",
              alignItems:    "center",
              justifyContent:"space-between",
              background:    "var(--color-bg-tertiary)",
            }}>
              <h5 style={{
                fontWeight: 700,
                color:      "var(--color-text-primary)",
                margin:     0,
              }}>
                {editRoom ? "✏️ Edit Room" : "➕ Add New Room"}
              </h5>
              <button
                onClick={closeModal}
                style={{
                  background:   "transparent",
                  border:       "none",
                  cursor:       "pointer",
                  color:        "var(--color-text-muted)",
                  fontSize:     "1.2rem",
                  lineHeight:   1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Room number */}
                <div>
                  <label style={{
                    display:      "block",
                    fontSize:     "var(--text-sm)",
                    fontWeight:   600,
                    color:        "var(--color-text-secondary)",
                    marginBottom: "6px",
                  }}>
                    Room Number *
                  </label>
                  <input
                    name="room_number"
                    value={form.room_number}
                    onChange={handleChange}
                    placeholder="e.g. 101, A-12"
                    className="custom-input"
                  />
                </div>

                {/* Type */}
                <div>
                  <label style={{
                    display:      "block",
                    fontSize:     "var(--text-sm)",
                    fontWeight:   600,
                    color:        "var(--color-text-secondary)",
                    marginBottom: "6px",
                  }}>
                    Room Type *
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option value="">Select type</option>
                    {roomTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label style={{
                    display:      "block",
                    fontSize:     "var(--text-sm)",
                    fontWeight:   600,
                    color:        "var(--color-text-secondary)",
                    marginBottom: "6px",
                  }}>
                    Price per Night (NPR) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 5000"
                    className="custom-input"
                    min="0"
                  />
                </div>

                {/* Availability */}
                <div style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "10px",
                  padding:    "14px 16px",
                  background: "var(--color-bg-tertiary)",
                  borderRadius:"var(--radius-sm)",
                  border:     "1px solid var(--color-border)",
                }}>
                  <input
                    id="is_available"
                    name="is_available"
                    type="checkbox"
                    checked={form.is_available}
                    onChange={handleChange}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <label
                    htmlFor="is_available"
                    style={{
                      fontSize:  "var(--text-sm)",
                      fontWeight: 500,
                      color:     "var(--color-text-primary)",
                      cursor:    "pointer",
                      margin:    0,
                    }}
                  >
                    Room is available for booking
                  </label>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{
              padding:       "16px 24px",
              borderTop:     "1px solid var(--color-border)",
              display:       "flex",
              gap:           "10px",
              justifyContent:"flex-end",
              background:    "var(--color-bg-tertiary)",
            }}>
              <button
                onClick={closeModal}
                style={{
                  background:   "transparent",
                  border:       "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding:      "9px 20px",
                  cursor:       "pointer",
                  color:        "var(--color-text-secondary)",
                  fontWeight:   500,
                  fontSize:     "var(--text-sm)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  background:   "var(--color-accent)",
                  border:       "none",
                  borderRadius: "var(--radius-sm)",
                  padding:      "9px 24px",
                  cursor:       submitting ? "not-allowed" : "pointer",
                  color:        "var(--color-accent-text)",
                  fontWeight:   600,
                  fontSize:     "var(--text-sm)",
                  opacity:      submitting ? 0.7 : 1,
                  transition:   "var(--transition-fast)",
                }}
              >
                {submitting
                  ? "Saving..."
                  : editRoom ? "Update Room" : "Create Room"
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE CONFIRM MODAL ════════════ */}
      {deleteId !== null && (
        <div
          onClick={() => setDeleteId(null)}
          style={{
            position:       "fixed",
            inset:          0,
            background:     "var(--color-bg-overlay)",
            zIndex:         "var(--z-modal)",
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
              maxWidth:     "400px",
              boxShadow:    "var(--shadow-xl)",
              overflow:     "hidden",
            }}
          >
            <div style={{ padding: "32px 28px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🗑️</div>
              <h5 style={{
                fontWeight:   700,
                color:        "var(--color-text-primary)",
                marginBottom: "8px",
              }}>
                Delete Room
              </h5>
              <p style={{
                color:        "var(--color-text-muted)",
                fontSize:     "var(--text-sm)",
                marginBottom: "24px",
              }}>
                Are you sure you want to delete this room?
                This action cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  onClick={() => setDeleteId(null)}
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
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  style={{
                    background:   "var(--color-danger)",
                    border:       "none",
                    borderRadius: "var(--radius-sm)",
                    padding:      "9px 24px",
                    cursor:       "pointer",
                    color:        "#ffffff",
                    fontWeight:   600,
                    fontSize:     "var(--text-sm)",
                    transition:   "var(--transition-fast)",
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}