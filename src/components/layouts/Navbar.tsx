import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Navbar() {
  const { isLogged, isAdmin, user, logout } = useAuth();
  const { theme, themeToggle } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive
      ? '2px solid var(--color-accent)'
      : '2px solid transparent',
    paddingBottom: '2px',
  });

  return (
    <nav
      style={{
        background: 'var(--color-bg-navbar)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-3">
          {/* ── Brand ──────────────────────────── */}
          <div
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🏨</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
              }}
            >
              H<span style={{ color: 'var(--color-accent)' }}>B</span>S
            </span>
          </div>

          {/* ── Desktop Nav Links ───────────────── */}
          <ul
            className="d-none d-lg-flex align-items-center gap-4 mb-0"
            style={{ listStyle: 'none', padding: 0 }}
          >
            <li>
              <NavLink
                to="/"
                className="text-decoration-none"
                style={({ isActive }) => ({
                  ...activeLinkStyle({ isActive }),
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'var(--transition-fast)',
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rooms"
                className="text-decoration-none"
                style={({ isActive }) => ({
                  ...activeLinkStyle({ isActive }),
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'var(--transition-fast)',
                })}
              >
                Rooms
              </NavLink>
            </li>
            {isLogged && (
              <li>
                <NavLink
                  to="/my-bookings"
                  className="text-decoration-none"
                  style={({ isActive }) => ({
                    ...activeLinkStyle({ isActive }),
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'var(--transition-fast)',
                  })}
                >
                  My Bookings
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/about"
                className="text-decoration-none"
                style={({ isActive }) => ({
                  ...activeLinkStyle({ isActive }),
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'var(--transition-fast)',
                })}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="text-decoration-none"
                style={({ isActive }) => ({
                  ...activeLinkStyle({ isActive }),
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'var(--transition-fast)',
                })}
              >
                Contact
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/dashboard"
                  className="text-decoration-none"
                  style={({ isActive }) => ({
                    color: isActive
                      ? 'var(--color-accent)'
                      : 'var(--color-accent)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    background: 'var(--color-accent-light)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-accent-border)',
                  })}
                >
                  ⚙️ Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          {/* ── Right Side ─────────────────────── */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={themeToggle}
              title="Toggle theme"
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontSize: '1rem',
                transition: 'var(--transition-fast)',
              }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Not logged in */}
            {!isLogged && (
              <div className="d-flex gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-ghost"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '7px 18px',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    background: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '7px 18px',
                    cursor: 'pointer',
                    color: 'var(--color-accent-text)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Logged in — profile dropdown */}
            {isLogged && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 12px 4px 4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-accent-light)',
                      border: '1px solid var(--color-accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {user?.name.split(' ')[0]}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {dropdownOpen ? '▲' : '▼'}
                  </span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      minWidth: '200px',
                      zIndex: 300,
                      overflow: 'hidden',
                    }}
                  >
                    {/* User info header */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid var(--color-border)',
                        background: 'var(--color-bg-tertiary)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {user?.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '2px',
                        }}
                      >
                        {user?.email}
                      </div>
                      <div style={{ marginTop: '6px' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: 'var(--color-accent-light)',
                            color: 'var(--color-accent)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--color-accent-border)',
                          }}
                        >
                          {isAdmin ? 'Administrator' : 'Guest'}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown items */}
                    {[
                      { icon: '👤', label: 'My Profile', path: '/profile' },
                      {
                        icon: '📋',
                        label: 'My Bookings',
                        path: '/my-bookings',
                      },
                      { icon: '⚙️', label: 'Settings', path: '/settings' },
                      ...(isAdmin
                        ? [
                            {
                              icon: '🛠️',
                              label: 'Dashboard',
                              path: '/dashboard',
                            },
                          ]
                        : []),
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          transition: 'var(--transition-fast)',
                          borderBottom: '1px solid var(--color-border)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            'var(--color-bg-tertiary)';
                          e.currentTarget.style.color =
                            'var(--color-text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color =
                            'var(--color-text-secondary)';
                        }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-danger)',
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        transition: 'var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          'var(--color-danger-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Mobile Hamburger ────────────────── */}
          <button
            className="d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              fontSize: '1.2rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* ── Mobile Menu ──────────────────────── */}
        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '16px 0',
            }}
          >
            {[
              { label: 'Home', path: '/' },
              { label: 'Rooms', path: '/rooms' },
              ...(isLogged
                ? [{ label: 'My Bookings', path: '/my-bookings' }]
                : []),
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
              ...(isAdmin ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '10px 8px',
                  color: isActive
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                })}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile auth buttons */}
            <div className="d-flex gap-2 mt-3">
              {!isLogged ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMenuOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '9px',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setMenuOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '9px',
                      background: 'var(--color-accent)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      color: 'var(--color-accent-text)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  style={{
                    flex: 1,
                    padding: '9px',
                    background: 'var(--color-danger-bg)',
                    border: '1px solid var(--color-danger-border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: 'var(--color-danger)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}
                >
                  🚪 Logout
                </button>
              )}
              <button
                onClick={themeToggle}
                style={{
                  padding: '9px 14px',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
