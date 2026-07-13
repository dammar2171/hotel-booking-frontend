// src/components/MapSection.tsx
export default function MapSection() {
  return (
    <section
      style={{
        padding: '100px 0',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div className="container">
        {/* ── Header ───────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--color-accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Find Us
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Our Location
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-base)',
              maxWidth: '400px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Perfectly situated in the heart of Mahendranagar — easy to reach,
            impossible to forget
          </p>
        </div>

        {/* ── Map Card ─────────────────────── */}
        <div
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Top info bar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  HotelBook — Mnr, Kanchanpur
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Open 24/7 · +977 9805752792
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/wfFjvktr6cZcDhzH"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 'var(--text-xs)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              🗺️ Get Directions
            </a>
          </div>

          {/* Google Map iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d183464.73623565785!2d79.87856109872452!3d29.016153102061843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1aeabbe14f1d3%3A0x6a96f25c77a58cbe!2sBhimdatta!5e1!3m2!1sen!2snp!4v1783914455656!5m2!1sen!2snp"
            width="100%"
            height="460"
            style={{
              border: 'none',
              display: 'block',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* Bottom quick info */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-bg-tertiary)',
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '📍', text: 'Mahendranagar, Kanchanpur, Nepal' },
              { icon: '✉️', text: 'info@hotelbook.com' },
              { icon: '🕐', text: 'Check-in from 4:00 AM' },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
