import { motion } from 'framer-motion';
import { scaleUp, staggerContainer } from '../animations/motions';

function SharedStats() {
  const stats = [
    { value: '500+', label: 'Happy Guests', icon: '😊' },
    { value: '50+', label: 'Luxury Rooms', icon: '🛏️' },
    { value: '10+', label: 'Years Excellence', icon: '🏆' },
    { value: '24/7', label: 'Concierge Support', icon: '🌙' },
  ];
  return (
    <motion.section
      style={{
        background: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '40px 0',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container">
        <div className="row g-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="col-6 col-lg-3"
              variants={scaleUp}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '8px',
                  borderRight: i < 3 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: '1.6rem',
                    marginBottom: '6px',
                  }}
                >
                  {s.icon}
                </div>

                <div
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </div>

                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-muted)',
                    marginTop: '6px',
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default SharedStats;
