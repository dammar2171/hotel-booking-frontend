import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useToast } from '../../contexts/ToastContext';
import type { Booking, Guest } from '../../types';
import MiniCard from '../../components/ui/MiniCard';

interface Room {
  id: number;
  room_number: string;
  type: string;
  price: number;
  is_available: boolean;
}

interface BookingForm {
  guest_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
}

const emptyForm: BookingForm = {
  guest_id: '',
  room_id: '',
  check_in: '',
  check_out: '',
};

const statusColors = {
  confirmed: {
    bg: 'var(--color-success-bg)',
    color: 'var(--color-success-text)',
    border: 'var(--color-success-border)',
  },
  cancelled: {
    bg: 'var(--color-danger-bg)',
    color: 'var(--color-danger-text)',
    border: 'var(--color-danger-border)',
  },
  pending: {
    bg: 'var(--color-warning-bg)',
    color: 'var(--color-warning-text)',
    border: 'var(--color-warning-border)',
  },
};

export default function ManageBookings() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  // ── Fetch all data ───────────────────────
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [bookRes, roomRes, guestRes] = await Promise.all([
        api.get('/bookings?limit=100'),
        api.get('/rooms?limit=100'),
        api.get('/guests?limit=100'),
      ]);
      setBookings(bookRes.data.data);
      setRooms(roomRes.data.data);
      setGuests(guestRes.data.data);
    } catch {
      addToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ── Helper lookups ───────────────────────
  const getRoomNumber = (id: number) =>
    rooms.find((r) => r.id === id)?.room_number ?? `Room #${id}`;

  const getGuestName = (id: number) =>
    guests.find((g) => g.id === id)?.name ?? `Guest #${id}`;

  // ── Modal handlers ───────────────────────
  const openCreate = () => {
    setForm(emptyForm);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
  };

  // ── Form change ──────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Create booking ───────────────────────
  const handleSubmit = async () => {
    if (!form.guest_id || !form.room_id || !form.check_in || !form.check_out) {
      addToast('All fields are required', 'error');
      return;
    }
    if (new Date(form.check_out) <= new Date(form.check_in)) {
      addToast('Check-out must be after check-in', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/bookings', {
        guest_id: Number(form.guest_id),
        room_id: Number(form.room_id),
        check_in: form.check_in,
        check_out: form.check_out,
      });
      addToast('Booking created successfully!', 'success');
      closeModal();
      fetchAll();
    } catch (err: any) {
      addToast(err?.response?.data?.message || 'Booking failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Cancel booking ───────────────────────
  const handleCancel = async (id: number) => {
    try {
      await api.put(`/bookings/${id}/cancel`);
      addToast('Booking cancelled!', 'success');
      setCancelId(null);
      fetchAll();
    } catch (err: any) {
      addToast(err?.response?.data?.message || 'Cancel failed', 'error');
    }
  };

  // ── Filter bookings ──────────────────────
  const filtered = bookings.filter((b) => {
    const guestName = getGuestName(b.guest_id).toLowerCase();
    const roomNumber = getRoomNumber(b.room_id).toLowerCase();
    const matchSearch =
      guestName.includes(search.toLowerCase()) ||
      roomNumber.includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ── Summary counts ───────────────────────
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length;
  const pending = bookings.filter((b) => b.status === 'pending').length;

  // ── Format date ──────────────────────────
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div>
      {/* ── Page Header ──────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Manage Bookings
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-sm)',
              marginTop: '4px',
            }}
          >
            View, create and cancel room bookings
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          + New Booking
        </button>
      </div>

      {/* ── Summary Cards ────────────────── */}
      <div className="row g-3 mb-4">
        {[
          {
            label: 'Total Bookings',
            value: bookings.length,
            icon: '📋',
            color: 'var(--color-accent)',
            bg: 'var(--color-accent-light)',
          },
          {
            label: 'Confirmed',
            value: confirmed,
            icon: '✅',
            color: 'var(--color-success-text)',
            bg: 'var(--color-success-bg)',
          },
          {
            label: 'Cancelled',
            value: cancelled,
            icon: '❌',
            color: 'var(--color-danger-text)',
            bg: 'var(--color-danger-bg)',
          },
          {
            label: 'Pending',
            value: pending,
            icon: '⏳',
            color: 'var(--color-warning-text)',
            bg: 'var(--color-warning-bg)',
          },
        ].map((summary) => (
          <div key={summary.label} className="col-sm-6 col-xl-3">
            <MiniCard summary={summary} />
          </div>
        ))}
      </div>

      {/* ── Search + Filter ──────────────── */}
      <div
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '16px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by guest name or room number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input"
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="custom-input"
          style={{ width: '160px' }}
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* ── Table ────────────────────────── */}
      <div
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {loading ? (
          <div className="loading-wrapper">
            <div
              className="spinner-border"
              style={{ color: 'var(--color-accent)' }}
              role="status"
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem' }}>📋</div>
            <h4>No bookings found</h4>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Try adjusting filters or create a new booking
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table w-100">
              <thead>
                <tr>
                  {[
                    '#',
                    'Guest',
                    'Room',
                    'Check In',
                    'Check Out',
                    'Total',
                    'Status',
                    'Actions',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, index) => {
                  const sc = statusColors[booking.status];
                  return (
                    <tr key={booking.id}>
                      {/* Index */}
                      <td style={{ color: 'var(--color-text-muted)' }}>
                        {index + 1}
                      </td>

                      {/* Guest */}
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--color-accent-light)',
                              border: '1px solid var(--color-accent-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'var(--color-accent)',
                              flexShrink: 0,
                            }}
                          >
                            {getGuestName(booking.guest_id)
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <span
                            style={{
                              fontWeight: 600,
                              color: 'var(--color-text-primary)',
                              fontSize: 'var(--text-sm)',
                            }}
                          >
                            {getGuestName(booking.guest_id)}
                          </span>
                        </div>
                      </td>

                      {/* Room */}
                      <td>
                        <span
                          style={{
                            background: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-full)',
                            padding: '3px 10px',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          🛏️ {getRoomNumber(booking.room_id)}
                        </span>
                      </td>

                      {/* Check in */}
                      <td
                        style={{
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {formatDate(booking.check_in)}
                      </td>

                      {/* Check out */}
                      <td
                        style={{
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {formatDate(booking.check_out)}
                      </td>

                      {/* Total price */}
                      <td
                        style={{
                          fontWeight: 700,
                          color: 'var(--color-accent)',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        NPR {booking.total_price.toLocaleString()}
                      </td>

                      {/* Status badge */}
                      <td>
                        <span
                          style={{
                            background: sc.bg,
                            color: sc.color,
                            border: `1px solid ${sc.border}`,
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        {booking.status === 'confirmed' ? (
                          <button
                            onClick={() => setCancelId(booking.id)}
                            style={{
                              background: 'var(--color-danger-bg)',
                              border: '1px solid var(--color-danger-border)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '6px 14px',
                              cursor: 'pointer',
                              color: 'var(--color-danger-text)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 600,
                            }}
                          >
                            ✕ Cancel
                          </button>
                        ) : (
                          <span
                            style={{
                              color: 'var(--color-text-muted)',
                              fontSize: 'var(--text-xs)',
                            }}
                          >
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
        )}
      </div>

      {/* ══ CREATE BOOKING MODAL ════════════ */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg-overlay)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '480px',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--color-bg-tertiary)',
              }}
            >
              <h5
                style={{
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                ➕ Create New Booking
              </h5>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  fontSize: '1.2rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {/* Guest select */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Select Guest *
                  </label>
                  <select
                    name="guest_id"
                    value={form.guest_id}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option value="">Choose a guest...</option>
                    {guests.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} — {g.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room select */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Select Room *
                  </label>
                  <select
                    name="room_id"
                    value={form.room_id}
                    onChange={handleChange}
                    className="custom-input"
                  >
                    <option value="">Choose a room...</option>
                    {rooms
                      .filter((r) => r.is_available)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          Room {r.room_number} — {r.type} — NPR {r.price}/night
                        </option>
                      ))}
                  </select>
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      marginTop: '4px',
                    }}
                  >
                    Only available rooms are shown
                  </p>
                </div>

                {/* Dates row */}
                <div className="row g-3">
                  <div className="col-6">
                    <label
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      Check In *
                    </label>
                    <input
                      name="check_in"
                      type="date"
                      value={form.check_in}
                      onChange={handleChange}
                      className="custom-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="col-6">
                    <label
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      Check Out *
                    </label>
                    <input
                      name="check_out"
                      type="date"
                      value={form.check_out}
                      onChange={handleChange}
                      className="custom-input"
                      min={
                        form.check_in || new Date().toISOString().split('T')[0]
                      }
                    />
                  </div>
                </div>

                {/* Price preview */}
                {form.room_id &&
                  form.check_in &&
                  form.check_out &&
                  new Date(form.check_out) > new Date(form.check_in) &&
                  (() => {
                    const room = rooms.find(
                      (r) => r.id === Number(form.room_id)
                    );
                    const nights = Math.round(
                      (new Date(form.check_out).getTime() -
                        new Date(form.check_in).getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    const total = (room?.price ?? 0) * nights;
                    return (
                      <div
                        style={{
                          background: 'var(--color-accent-light)',
                          border: '1px solid var(--color-accent-border)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '14px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-accent)',
                            fontWeight: 500,
                          }}
                        >
                          💰 Estimated Total ({nights} night
                          {nights > 1 ? 's' : ''})
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 800,
                            color: 'var(--color-accent)',
                          }}
                        >
                          NPR {total.toLocaleString()}
                        </span>
                      </div>
                    );
                  })()}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                background: 'var(--color-bg-tertiary)',
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 20px',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  fontSize: 'var(--text-sm)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  background: 'var(--color-accent)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 24px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  color: 'var(--color-accent-text)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Creating...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CANCEL CONFIRM MODAL ════════════ */}
      {cancelId !== null && (
        <div
          onClick={() => setCancelId(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg-overlay)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '380px',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '32px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
              <h5
                style={{
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Cancel Booking
              </h5>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: '8px',
                }}
              >
                Are you sure you want to cancel this booking?
              </p>
              <p
                style={{
                  color: 'var(--color-success)',
                  fontSize: 'var(--text-xs)',
                  marginBottom: '24px',
                  fontWeight: 500,
                }}
              >
                ✅ The room will become available again
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => setCancelId(null)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '9px 24px',
                    cursor: 'pointer',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Keep It
                </button>
                <button
                  onClick={() => handleCancel(cancelId)}
                  style={{
                    background: 'var(--color-danger)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '9px 24px',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
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
