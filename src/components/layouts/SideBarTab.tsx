import { useAuth } from '../../contexts/AuthContext';
import type { User } from '../../types';
type ActiveTab = 'profile' | 'password' | 'appearance' | 'about';
interface Card {
  background: string;
  border: string;
  borderRadius: string;
  overflow: string;
  boxShadow: string;
}

interface SideBarProps {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  card: Card;
  user: User | null;
}
function SideBarTab({ activeTab, setActiveTab, card, user }: SideBarProps) {
  const tabs: { key: typeof activeTab; label: string; icon: string }[] = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'password', label: 'Password', icon: '🔒' },
    { key: 'appearance', label: 'Appearance', icon: '🎨' },
    { key: 'about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <div style={card}>
      {/* User avatar card */}
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-tertiary)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-accent-light)',
            border: '2px solid var(--color-accent-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-accent)',
            margin: '0 auto 12px',
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div
          style={{
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {user?.name}
        </div>
        <div
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginTop: '2px',
          }}
        >
          {user?.email}
        </div>
        <div style={{ marginTop: '10px' }}>
          <span
            style={{
              background: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-accent-border)',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
            }}
          >
            {user?.role === 'admin' ? 'Administrator' : 'Guest'}
          </span>
        </div>
      </div>

      {/* Tab list */}
      <div style={{ padding: '8px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background:
                activeTab === tab.key
                  ? 'var(--color-accent-light)'
                  : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              borderLeft:
                activeTab === tab.key
                  ? '3px solid var(--color-accent)'
                  : '3px solid transparent',
              cursor: 'pointer',
              color:
                activeTab === tab.key
                  ? 'var(--color-accent)'
                  : 'var(--color-text-secondary)',
              fontWeight: activeTab === tab.key ? 600 : 400,
              fontSize: 'var(--text-sm)',
              textAlign: 'left',
              transition: 'var(--transition-fast)',
              marginBottom: '2px',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideBarTab;
