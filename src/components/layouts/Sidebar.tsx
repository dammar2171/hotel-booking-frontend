import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '🛏️', label: 'Manage Rooms', path: '/dashboard/rooms' },
  { icon: '👥', label: 'Manage Guests', path: '/dashboard/guests' },
  { icon: '📋', label: 'Manage Bookings', path: '/dashboard/bookings' },
  { icon: '📈', label: 'Stats', path: '/dashboard/stats' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuth();
  const { theme, themeToggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        width: expanded ? '260px' : '68px',
        minHeight: '100vh',
        background: 'var(--color-bg-card)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        position: 'sticky',
        top: 0,
        boxShadow: 'var(--shadow-sm)',
        zIndex: 200,
      }}
    >
      {/* ── Header ───────────────────────────── */}
      <div
        style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'space-between' : 'center',
          borderBottom: '1px solid var(--color-border)',
          minHeight: '68px',
        }}
      >
        {expanded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🏨</span>
            <span
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-accent)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              HBD
            </span>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
            transition: 'var(--transition-fast)',
          }}
        >
          {expanded ? '◀' : '▶'}
        </button>
      </div>

      {/* ── Nav Items ────────────────────────── */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '4px',
              textDecoration: 'none',
              background: isActive
                ? 'var(--color-accent-light)'
                : 'transparent',
              color: isActive
                ? 'var(--color-accent)'
                : 'var(--color-text-secondary)',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.875rem',
              borderLeft: isActive
                ? `3px solid var(--color-accent)`
                : '3px solid transparent',
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            })}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
              {item.icon}
            </span>
            {expanded && (
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Divider ──────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* ── Theme Toggle ─────────────────────── */}
      <div style={{ padding: '8px' }}>
        <button
          onClick={themeToggle}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            background: 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            transition: 'var(--transition-fast)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
          {expanded && (
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          )}
        </button>
      </div>

      {/* ── User Section ─────────────────────── */}
      <div
        style={{
          padding: '12px 8px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {/* User info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '6px',
            overflow: 'hidden',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-accent-light)',
              border: '1px solid var(--color-accent-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              flexShrink: 0,
            }}
          >
            {user?.name.charAt(0).toUpperCase()}
          </div>

          {/* Name + role */}
          {expanded && (
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Administrator
              </div>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            background: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            color: 'var(--color-danger)',
            fontSize: '0.825rem',
            fontWeight: 500,
            transition: 'var(--transition-fast)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>🚪</span>
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
