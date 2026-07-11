import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ── Shared card style ────────────────────
  const card = {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-secondary)',
        minHeight: '100vh',
        padding: '40px 0',
      }}
    >
      <div className="container">
        {/* ── Page Header ──────────────────── */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            My Profile
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-sm)',
              marginTop: '4px',
            }}
          >
            View your account information
          </p>
        </div>

        <div className="row g-4">
          {/* ── Left — Profile Card ──────────── */}
          <div className="col-lg-4">
            {/* Avatar card */}
            <div style={{ ...card, marginBottom: '16px' }}>
              <div
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  background: 'var(--color-bg-tertiary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {/* Avatar circle */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-accent-light)',
                    border: '3px solid var(--color-accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    margin: '0 auto 16px',
                  }}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </div>

                <h4
                  style={{
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {user?.name}
                </h4>
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: '12px',
                  }}
                >
                  {user?.email}
                </p>

                {/* Role badge */}
                <span
                  style={{
                    background: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                    border: '1px solid var(--color-accent-border)',
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {user?.role === 'admin' ? '⚙️ Administrator' : '🧳 Guest'}
                </span>
              </div>

              {/* Quick info rows */}
              <div style={{ padding: '16px 24px' }}>
                {[
                  { icon: '👤', label: 'Name', value: user?.name },
                  { icon: '✉️', label: 'Email', value: user?.email },
                  { icon: '🔑', label: 'Role', value: user?.role },
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
                        gap: '8px',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.icon} {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin dashboard shortcut */}
            {user?.role === 'admin' && (
              <div
                onClick={() => navigate('/dashboard')}
                style={{
                  ...card,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  transition: 'var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  ⚙️
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    Admin Dashboard
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Manage rooms, guests and bookings
                  </div>
                </div>
                <span
                  style={{
                    marginLeft: 'auto',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  →
                </span>
              </div>
            )}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--color-danger-text)',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'var(--transition-fast)',
              }}
            >
              🚪 Logout
            </button>
          </div>

          {/* ── Right — Tabs ─────────────────── */}
          <div className="col-lg-8">
            {/* Booking section*/}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '6px',
                marginBottom: '16px',
              }}
            >
              My Bookings
            </div>
            <div style={card}>
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--color-border)',
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
                  📋 My Booking History
                </h5>
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-xs)',
                    margin: '4px 0 0',
                  }}
                >
                  All your past and current bookings
                </p>
              </div>

              <div style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</div>
                <h5
                  style={{
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  View Full Booking History
                </h5>
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: '20px',
                  }}
                >
                  Go to My Bookings page to see all your reservations
                </p>
                <button
                  onClick={() => navigate('/my-bookings')}
                  style={{
                    background: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '11px 28px',
                    cursor: 'pointer',
                    color: 'var(--color-accent-text)',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Go to My Bookings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
