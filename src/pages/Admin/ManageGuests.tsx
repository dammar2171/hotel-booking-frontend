import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useToast } from "../../contexts/ToastContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

interface Guest {
  id:    number;
  name:  string;
  email: string;
  phone: string;
}

interface GuestForm {
  name:  string;
  email: string;
  phone: string;
}

const emptyForm: GuestForm = {
  name:  "",
  email: "",
  phone: "",
};

export default function ManageGuests() {
  const { addToast }                    = useToast();
  const [guests,     setGuests]         = useState<Guest[]>([]);
  const [loading,    setLoading]        = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const [showModal,  setShowModal]      = useState(false);
  const [editGuest,  setEditGuest]      = useState<Guest | null>(null);
  const [form,       setForm]           = useState<GuestForm>(emptyForm);
  const [deleteId,   setDeleteId]       = useState<number | null>(null);
  const [search,     setSearch]         = useState("");

  // ── Fetch ────────────────────────────────
  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/guests?limit=100");
      setGuests(res.data.data);
    } catch {
      addToast("Failed to load guests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuests(); }, []);

  // ── Modal handlers ───────────────────────
  const openCreate = () => {
    setEditGuest(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (guest: Guest) => {
    setEditGuest(guest);
    setForm({ name: guest.name, email: guest.email, phone: guest.phone });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditGuest(null);
    setForm(emptyForm);
  };

  // ── Form change ──────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Submit ───────────────────────────────
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      addToast("All fields are required", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (editGuest) {
        await api.put(`/guests/${editGuest.id}`, form);
        addToast("Guest updated successfully!", "success");
      } else {
        await api.post("/guests", form);
        addToast("Guest registered successfully!", "success");
      }
      closeModal();
      fetchGuests();
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
      await api.delete(`/guests/${id}`);
      addToast("Guest deleted successfully!", "success");
      setDeleteId(null);
      fetchGuests();
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Delete failed",
        "error"
      );
    }
  };

  // ── Filter ───────────────────────────────
  const filtered = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.email.toLowerCase().includes(search.toLowerCase()) ||
    g.phone.includes(search)
  );

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
            Manage Guests
          </h2>
          <p style={{
            color:     "var(--color-text-muted)",
            fontSize:  "var(--text-sm)",
            marginTop: "4px",
          }}>
            View and manage all registered hotel guests
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
          }}
        >
          + Add New Guest
        </button>
      </div>

      {/* ── Summary Cards ────────────────── */}
      <div className="row g-3 mb-4">
        {[
          {
            label: "Total Guests",
            value: guests.length,
            icon:  "👥",
            color: "var(--color-info-text)",
            bg:    "var(--color-info-bg)",
          },
          {
            label: "Search Results",
            value: filtered.length,
            icon:  "🔍",
            color: "var(--color-accent)",
            bg:    "var(--color-accent-light)",
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
                width:         "48px",
                height:        "48px",
                borderRadius:  "var(--radius-md)",
                background:    s.bg,
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                fontSize:      "1.4rem",
                flexShrink:    0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{
                  fontSize:  "1.5rem",
                  fontWeight: 800,
                  color:     s.color,
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

      {/* ── Search ───────────────────────── */}
      <div style={{
        background:   "var(--color-bg-card)",
        border:       "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding:      "16px 20px",
        marginBottom: "16px",
      }}>
        <input
          type="text"
          placeholder="🔍 Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input"
        />
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
          <LoadingSpinner/>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>👥</div>
            <h4>No guests found</h4>
            <p style={{ color: "var(--color-text-muted)" }}>
              Try adjusting search or register a new guest
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="custom-table w-100">
              <thead>
                <tr>
                  {["#", "Avatar", "Name", "Email", "Phone", "Actions"]
                    .map((h) => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest, index) => (
                  <tr key={guest.id}>

                    {/* Index */}
                    <td style={{ color: "var(--color-text-muted)" }}>
                      {index + 1}
                    </td>

                    {/* Avatar */}
                    <td>
                      <div style={{
                        width:         "36px",
                        height:        "36px",
                        borderRadius:  "var(--radius-full)",
                        background:    "var(--color-accent-light)",
                        border:        "1px solid var(--color-accent-border)",
                        display:       "flex",
                        alignItems:    "center",
                        justifyContent:"center",
                        fontSize:      "0.85rem",
                        fontWeight:    700,
                        color:         "var(--color-accent)",
                      }}>
                        {guest.name.charAt(0).toUpperCase()}
                      </div>
                    </td>

                    {/* Name */}
                    <td style={{
                      fontWeight: 600,
                      color:      "var(--color-text-primary)",
                    }}>
                      {guest.name}
                    </td>

                    {/* Email */}
                    <td style={{ color: "var(--color-text-secondary)" }}>
                      {guest.email}
                    </td>

                    {/* Phone */}
                    <td style={{ color: "var(--color-text-secondary)" }}>
                      {guest.phone}
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => openEdit(guest)}
                          style={{
                            background:   "var(--color-info-bg)",
                            border:       "1px solid var(--color-info-border)",
                            borderRadius: "var(--radius-sm)",
                            padding:      "6px 14px",
                            cursor:       "pointer",
                            color:        "var(--color-info-text)",
                            fontSize:     "var(--text-xs)",
                            fontWeight:   600,
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(guest.id)}
                          style={{
                            background:   "var(--color-danger-bg)",
                            border:       "1px solid var(--color-danger-border)",
                            borderRadius: "var(--radius-sm)",
                            padding:      "6px 14px",
                            cursor:       "pointer",
                            color:        "var(--color-danger-text)",
                            fontSize:     "var(--text-xs)",
                            fontWeight:   600,
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

      {/* ══ CREATE / EDIT MODAL ═════════════ */}
      {showModal && (
        <div
          onClick={closeModal}
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
              maxWidth:     "460px",
              boxShadow:    "var(--shadow-xl)",
              overflow:     "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding:        "20px 24px",
              borderBottom:   "1px solid var(--color-border)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              background:     "var(--color-bg-tertiary)",
            }}>
              <h5 style={{
                fontWeight: 700,
                color:      "var(--color-text-primary)",
                margin:     0,
              }}>
                {editGuest ? "✏️ Edit Guest" : "➕ Register New Guest"}
              </h5>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  color:      "var(--color-text-muted)",
                  fontSize:   "1.2rem",
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px" }}>
              <div style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "18px",
              }}>
                {[
                  {
                    name:        "name",
                    label:       "Full Name",
                    placeholder: "e.g. Dammar Bhatt",
                    type:        "text",
                  },
                  {
                    name:        "email",
                    label:       "Email Address",
                    placeholder: "e.g. dammar@email.com",
                    type:        "email",
                  },
                  {
                    name:        "phone",
                    label:       "Phone Number",
                    placeholder: "e.g. 9800000000",
                    type:        "tel",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label style={{
                      display:      "block",
                      fontSize:     "var(--text-sm)",
                      fontWeight:   600,
                      color:        "var(--color-text-secondary)",
                      marginBottom: "6px",
                    }}>
                      {field.label} *
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name as keyof GuestForm]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="custom-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding:        "16px 24px",
              borderTop:      "1px solid var(--color-border)",
              display:        "flex",
              gap:            "10px",
              justifyContent: "flex-end",
              background:     "var(--color-bg-tertiary)",
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
                }}
              >
                {submitting
                  ? "Saving..."
                  : editGuest ? "Update Guest" : "Register Guest"
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
              maxWidth:     "380px",
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
                Delete Guest
              </h5>
              <p style={{
                color:        "var(--color-text-muted)",
                fontSize:     "var(--text-sm)",
                marginBottom: "8px",
              }}>
                Are you sure you want to delete this guest?
              </p>
              <p style={{
                color:        "var(--color-danger)",
                fontSize:     "var(--text-xs)",
                marginBottom: "24px",
                fontWeight:   500,
              }}>
                ⚠️ Cannot delete guest with existing bookings
              </p>
              <div style={{
                display:        "flex",
                gap:            "10px",
                justifyContent: "center",
              }}>
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