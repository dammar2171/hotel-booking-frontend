import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/motions';
function WhyChooseSection() {
  const features = [
    {
      icon: '🛏️',
      title: 'Handpicked Rooms',
      desc: 'Every room curated for comfort, elegance and a flawless guest experience.',
    },
    {
      icon: '⚡',
      title: 'Instant Booking',
      desc: 'Reserve your perfect room in under 60 seconds — no calls, no waiting.',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      desc: 'Bank-grade encryption protects every transaction and personal detail.',
    },
    {
      icon: '🌟',
      title: 'Concierge Support',
      desc: 'Our dedicated team is available around the clock for every request.',
    },
  ];
  return (
    <motion.section
      style={{ padding: '100px 0' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
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
            Our Promise
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Why Guests Choose Us
          </h2>

          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-lg)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            We redefine hospitality with a commitment to excellence that goes
            beyond expectations
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div className="row g-4" variants={staggerContainer}>
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              className="col-sm-6 col-lg-3"
              variants={fadeUp}
            >
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 28px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'var(--transition-base)',
                }}
              >
                {/* Corner Number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: 'var(--color-border)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-light)',
                    border: '1px solid var(--color-accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '24px',
                  }}
                >
                  {item.icon}
                </div>

                <h5
                  style={{
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '10px',
                    fontSize: 'var(--text-lg)',
                  }}
                >
                  {item.title}
                </h5>

                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-sm)',
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    background: 'var(--color-accent)',
                    borderRadius: '0 var(--radius-full) 0 0',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default WhyChooseSection;
