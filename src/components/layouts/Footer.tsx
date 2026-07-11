import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand */}
          <div className="col-lg-4">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🏨</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'var(--color-accent)',
                }}
              >
                HotelBook
              </span>
            </div>
            <p
              style={{
                color: 'var(--color-text-footer)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Your trusted hotel booking platform. Comfort, luxury and great
              service — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-sm-6 col-lg-2">
            <h6
              style={{
                color: '#ffffff',
                fontWeight: 600,
                marginBottom: '16px',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Quick Links
            </h6>
            {['Home', 'Rooms', 'About', 'Contact'].map((link) => (
              <div key={link} style={{ marginBottom: '10px' }}>
                <span
                  onClick={() =>
                    link === 'Home'
                      ? navigate('/')
                      : navigate(`/${link.toLowerCase().replace(' ', '-')}`)
                  }
                  style={{
                    color: 'var(--color-text-footer)',
                    fontSize: 'var(--text-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {link}
                </span>
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="col-sm-6 col-lg-3">
            <h6
              style={{
                color: '#ffffff',
                fontWeight: 600,
                marginBottom: '16px',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Services
            </h6>
            {[
              'Room Booking',
              'Event Hosting',
              'Airport Pickup',
              'Room Service',
            ].map((s) => (
              <div key={s} style={{ marginBottom: '10px' }}>
                <span
                  style={{
                    color: 'var(--color-text-footer)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="col-lg-3">
            <h6
              style={{
                color: '#ffffff',
                fontWeight: 600,
                marginBottom: '16px',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Contact Us
            </h6>
            {[
              { icon: '📍', text: 'Mahendranagar, Nepal' },
              { icon: '📞', text: '+977 9805752792' },
              { icon: '✉️', text: 'info@hotelbooking.com' },
              { icon: '🕐', text: '24/7 Support' },
            ].map((c) => (
              <div
                key={c.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{c.icon}</span>
                <span
                  style={{
                    color: 'var(--color-text-footer)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span
            style={{
              color: 'var(--color-text-footer)',
              fontSize: 'var(--text-sm)',
            }}
          >
            © 2024 HotelBook. All rights reserved.
          </span>
          <span
            style={{
              color: 'var(--color-text-footer)',
              fontSize: 'var(--text-sm)',
            }}
          >
            Built with ❤️ by Dammar Bhatt
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
