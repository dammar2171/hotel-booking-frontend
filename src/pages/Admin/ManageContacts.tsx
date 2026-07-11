import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useToast } from '../../contexts/ToastContext';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ManageContacts() {
  const { addToast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState('');

  // ── Fetch ────────────────────────────────
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/contacts');
      setContacts(res.data.data ?? []);
    } catch {
      addToast('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ── Delete ───────────────────────────────
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/contacts/${id}`);
      addToast('Contact deleted successfully!', 'success');
      setDeleteId(null);
      fetchContacts();
    } catch (err: any) {
      addToast(err?.response?.data?.message || 'Delete failed', 'error');
    }
  };

  // ── Filter ───────────────────────────────
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  // ── Shared card style ────────────────────
  const card = {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
  };

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
            Manage Contacts
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-sm)',
              marginTop: '4px',
            }}
          >
            View and manage all contact messages from users
          </p>
        </div>

        {/* Total badge */}
        <div
          style={{
            background: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 16px',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--color-accent)',
          }}
        >
          📬 {contacts.length} Total Messages
        </div>
      </div>

      {/* ── Summary Cards ────────────────── */}
      <div className="row g-3 mb-4">
        {[
          {
            label: 'Total Messages',
            value: contacts.length,
            icon: '📬',
            color: 'var(--color-accent)',
            bg: 'var(--color-accent-light)',
          },
          {
            label: 'Search Results',
            value: filtered.length,
            icon: '🔍',
            color: 'var(--color-info-text)',
            bg: 'var(--color-info-bg)',
          },
          {
            label: 'Unique Senders',
            value: new Set(contacts.map((c) => c.email)).size,
            icon: '👥',
            color: 'var(--color-success-text)',
            bg: 'var(--color-success-bg)',
          },
        ].map((s) => (
          <div key={s.label} className="col-sm-4">
            <div
              style={{
                ...card,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: s.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search ───────────────────────── */}
      <div
        style={{
          ...card,
          padding: '16px 20px',
          marginBottom: '16px',
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name, email, phone or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input"
        />
      </div>

      {/* ── Table ────────────────────────── */}
      <div style={card}>
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
            <div style={{ fontSize: '3rem' }}>📭</div>
            <h4>No contacts found</h4>
            <p style={{ color: 'var(--color-text-muted)' }}>
              No messages have been received yet
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table w-100">
              <thead>
                <tr>
                  {[
                    '#',
                    'Sender',
                    'Contact Info',
                    'Subject',
                    'Message Preview',
                    'Actions',
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact, index) => (
                  <tr key={contact.id}>
                    {/* Index */}
                    <td style={{ color: 'var(--color-text-muted)' }}>
                      {index + 1}
                    </td>

                    {/* Sender */}
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
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-accent-light)',
                            border: '1px solid var(--color-accent-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--color-accent)',
                            flexShrink: 0,
                          }}
                        >
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: 'var(--color-text-primary)',
                              fontSize: 'var(--text-sm)',
                            }}
                          >
                            {contact.name}
                          </div>
                          <div
                            style={{
                              color: 'var(--color-text-muted)',
                              fontSize: 'var(--text-xs)',
                            }}
                          >
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          📞 {contact.phone}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          ✉️ {contact.email}
                        </span>
                      </div>
                    </td>

                    {/* Subject */}
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
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {contact.subject}
                      </span>
                    </td>

                    {/* Message preview */}
                    <td
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--text-xs)',
                        maxWidth: '200px',
                      }}
                    >
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '180px',
                        }}
                      >
                        {contact.message}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {/* View */}
                        <button
                          onClick={() => setViewContact(contact)}
                          style={{
                            background: 'var(--color-info-bg)',
                            border: '1px solid var(--color-info-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '6px 14px',
                            cursor: 'pointer',
                            color: 'var(--color-info-text)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          👁️ View
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteId(contact.id)}
                          style={{
                            background: 'var(--color-danger-bg)',
                            border: '1px solid var(--color-danger-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '6px 14px',
                            cursor: 'pointer',
                            color: 'var(--color-danger-text)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
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

      {/* ══ VIEW MODAL ══════════════════════ */}
      {viewContact && (
        <div
          onClick={() => setViewContact(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg-overlay)',
            zIndex: 1000,
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
              maxWidth: '520px',
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
                📬 Contact Message
              </h5>
              <button
                onClick={() => setViewContact(null)}
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
              {/* Sender info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-accent-light)',
                    border: '2px solid var(--color-accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    flexShrink: 0,
                  }}
                >
                  {viewContact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--text-base)',
                    }}
                  >
                    {viewContact.name}
                  </div>
                  <div
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--text-xs)',
                      marginTop: '2px',
                    }}
                  >
                    {viewContact.email}
                  </div>
                  <div
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    {viewContact.phone}
                  </div>
                </div>
              </div>

              {/* Details rows */}
              {[
                { label: 'Name', value: viewContact.name, icon: '👤' },
                { label: 'Email', value: viewContact.email, icon: '✉️' },
                { label: 'Phone', value: viewContact.phone, icon: '📞' },
                { label: 'Subject', value: viewContact.subject, icon: '📌' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      minWidth: '80px',
                    }}
                  >
                    {item.icon} {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      textAlign: 'right',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}

              {/* Message */}
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  💬 Message
                </div>
                <div
                  style={{
                    background: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {viewContact.message}
                </div>
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
                onClick={() => {
                  setDeleteId(viewContact.id);
                  setViewContact(null);
                }}
                style={{
                  background: 'var(--color-danger-bg)',
                  border: '1px solid var(--color-danger-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 20px',
                  cursor: 'pointer',
                  color: 'var(--color-danger-text)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                }}
              >
                🗑️ Delete
              </button>

              <a
                href={`mailto:${viewContact.email}`}
                style={{
                  background: 'var(--color-accent)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 20px',
                  color: 'var(--color-accent-text)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                ✉️ Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE CONFIRM MODAL ════════════ */}
      {deleteId !== null && (
        <div
          onClick={() => setDeleteId(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg-overlay)',
            zIndex: 1000,
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
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🗑️</div>
              <h5
                style={{
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Delete Message
              </h5>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: '24px',
                }}
              >
                Are you sure you want to delete this contact message? This
                action cannot be undone.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => setDeleteId(null)}
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
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
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
