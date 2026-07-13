import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import '../styles/Home.css';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleUp } from '../animations/motions';
import WhyChooseSection from '../components/WhyChooseSection';
import SharedStats from '../components/SharedStats';

const roomTypes = [
  {
    icon: '🏠',
    type: 'Standard Room',
    price: 'NPR 2,000',
    desc: 'Thoughtfully designed for solo travelers and short stays.',
    features: [
      'Free WiFi',
      'Air Conditioning',
      'Smart TV',
      'Daily Housekeeping',
    ],
    popular: false,
  },
  {
    icon: '✨',
    type: 'Deluxe Room',
    price: 'NPR 5,000',
    desc: 'Elevated comfort with panoramic city views and premium amenities.',
    features: [
      'Free WiFi',
      'Air Conditioning',
      'Mini Bar',
      'King Bed',
      'City View',
    ],
    popular: true,
  },
  {
    icon: '👑',
    type: 'Suite Room',
    price: 'NPR 12,000',
    desc: 'An indulgent sanctuary for those who accept nothing but the finest.',
    features: ['Free WiFi', 'Private Jacuzzi', 'Living Room', 'Butler Service'],
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Dammar Bhatt',
    role: 'Business Traveler',
    review:
      'Absolutely flawless experience from check-in to check-out. The attention to detail is unmatched.',
    rating: 5,
    avatar: 'D',
  },
  {
    name: 'Prabin jagari',
    role: 'Honeymoon Guest',
    review:
      'The suite exceeded every expectation. My wife and I felt like royalty the entire stay.',
    rating: 5,
    avatar: 'P',
  },
  {
    name: 'Dheeraj Bokati',
    role: 'Leisure Traveler',
    review:
      'Stunning rooms, impeccable service and the booking process was effortless. Will return.',
    rating: 5,
    avatar: 'D',
  },
];

const amenities = [
  { icon: '🏊', label: 'Infinity Pool' },
  { icon: '🍽️', label: 'Fine Dining' },
  { icon: '💆', label: 'Spa & Wellness' },
  { icon: '🏋️', label: 'Fitness Center' },
  { icon: '🚗', label: 'Valet Parking' },
  { icon: '✈️', label: 'Airport Transfer' },
  { icon: '📶', label: 'High Speed WiFi' },
  { icon: '🎰', label: 'Business Center' },
];

export default function Home() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--color-bg-secondary)' }}>
        {/* ══ HERO — untouched ══════════════════ */}
        <motion.div
          className="heroContainer"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-accent-light)',
              border: '1px solid var(--color-accent-border)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 14px',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-accent)',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            ⭐ Premium Hotel Experience
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            Your Perfect Stay{' '}
            <span style={{ color: 'var(--color-accent)' }}>Starts Here</span>
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-inverse)',
              marginBottom: '36px',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}
          >
            Discover luxury and comfort at Hotel Booking System. Book your room
            in minutes and enjoy a world-class experience.
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/rooms')}
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '13px 28px',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                cursor: 'pointer',
                transition: 'var(--transition-base)',
              }}
            >
              Browse Rooms
            </button>

            {!isLogged && (
              <button
                onClick={() => navigate('/register')}
                style={{
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '13px 28px',
                  fontWeight: 500,
                  fontSize: 'var(--text-base)',
                  cursor: 'pointer',
                  transition: 'var(--transition-base)',
                }}
              >
                Create Account
              </button>
            )}
          </div>
        </motion.div>

        {/* ══ STATS BAR ═══════════════════════════ */}
        <SharedStats />

        {/* ══ WHY CHOOSE US ═══════════════════════ */}
        <WhyChooseSection />

        {/* ══ ROOM TYPES ══════════════════════════ */}
        <motion.section
          style={{
            padding: '100px 0',
            background: 'var(--color-bg-primary)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container">
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
                Accommodations
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
                Choose Your Perfect Room
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
                Each room is a masterpiece of comfort and refined taste
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="row g-4">
              {roomTypes.map((room) => (
                <motion.div
                  variants={fadeUp}
                  key={room.type}
                  className="col-md-4"
                >
                  <div
                    style={{
                      background: 'var(--color-bg-card)',
                      border: room.popular
                        ? '2px solid var(--color-accent)'
                        : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'var(--transition-base)',
                      boxShadow: room.popular
                        ? 'var(--shadow-lg)'
                        : 'var(--shadow-card)',
                    }}
                  >
                    {/* Popular badge */}
                    {room.popular && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'var(--color-accent)',
                          color: 'var(--color-accent-text)',
                          padding: '4px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          zIndex: 1,
                        }}
                      >
                        Most Popular
                      </div>
                    )}

                    {/* Top color bar */}
                    <div
                      style={{
                        height: '4px',
                        background: room.popular
                          ? 'var(--color-accent)'
                          : 'var(--color-border)',
                      }}
                    />

                    {/* Card content */}
                    <div
                      style={{
                        padding: '36px 32px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Icon + type */}
                      <div style={{ marginBottom: '20px' }}>
                        <div
                          style={{
                            fontSize: '2rem',
                            marginBottom: '12px',
                          }}
                        >
                          {room.icon}
                        </div>
                        <h4
                          style={{
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            margin: 0,
                            fontSize: 'var(--text-xl)',
                          }}
                        >
                          {room.type}
                        </h4>
                      </div>

                      {/* Price */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '4px',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: 'var(--color-accent)',
                            lineHeight: 1,
                          }}
                        >
                          {room.price}
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          / night
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        style={{
                          height: '1px',
                          background: 'var(--color-border)',
                          margin: '16px 0',
                        }}
                      />

                      <p
                        style={{
                          color: 'var(--color-text-muted)',
                          fontSize: 'var(--text-sm)',
                          marginBottom: '20px',
                          lineHeight: 1.7,
                        }}
                      >
                        {room.desc}
                      </p>

                      {/* Features */}
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: '0 0 28px',
                          flex: 1,
                        }}
                      >
                        {room.features.map((feat) => (
                          <li
                            key={feat}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-text-secondary)',
                              marginBottom: '8px',
                            }}
                          >
                            <span
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--color-success-bg)',
                                border: '1px solid var(--color-success-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                flexShrink: 0,
                                color: 'var(--color-success)',
                              }}
                            >
                              ✓
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      {/* Book button */}
                      <button
                        onClick={() => navigate('/rooms')}
                        style={{
                          width: '100%',
                          padding: '13px',
                          background: room.popular
                            ? 'var(--color-accent)'
                            : 'transparent',
                          color: room.popular
                            ? 'var(--color-accent-text)'
                            : 'var(--color-accent)',
                          border: '1px solid var(--color-accent)',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 600,
                          fontSize: 'var(--text-sm)',
                          cursor: 'pointer',
                          transition: 'var(--transition-base)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ══ AMENITIES ═══════════════════════════ */}
        <motion.section
          style={{ padding: '100px 0' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container">
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '60px',
              }}
            >
              <div>
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
                  World Class
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Hotel Amenities
                </h2>
              </div>

              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-base)',
                  maxWidth: '360px',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Every detail considered. Every comfort provided. Experience the
                full spectrum of luxury.
              </p>
            </motion.div>

            <motion.div className="row g-3" variants={staggerContainer}>
              {amenities.map((a) => (
                <motion.div
                  key={a.label}
                  className="col-6 col-sm-4 col-lg-3"
                  variants={fadeUp}
                >
                  <div
                    style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'var(--transition-base)',
                      cursor: 'default',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-accent-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        flexShrink: 0,
                      }}
                    >
                      {a.icon}
                    </div>

                    <span
                      style={{
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      {a.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ══ TESTIMONIALS ════════════════════════ */}
        <motion.section
          style={{
            padding: '100px 0',
            background: 'var(--color-bg-primary)',
          }}
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
                Guest Stories
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
                What Our Guests Say
              </h2>

              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-lg)',
                  maxWidth: '480px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Real stories from real guests who experienced the difference
              </p>
            </motion.div>

            {/* Testimonial Cards */}
            <motion.div className="row g-4" variants={staggerContainer}>
              {testimonials.map((t) => (
                <motion.div key={t.name} className="col-md-4" variants={fadeUp}>
                  <div
                    style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '36px 32px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    {/* Quote */}
                    <div
                      style={{
                        fontSize: '5rem',
                        lineHeight: 0.8,
                        color: 'var(--color-accent-border)',
                        fontFamily: 'Georgia, serif',
                        marginBottom: '16px',
                        userSelect: 'none',
                      }}
                    >
                      "
                    </div>

                    {/* Stars */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '3px',
                        marginBottom: '16px',
                      }}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color: '#f59e0b',
                            fontSize: 'var(--text-base)',
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Review */}
                    <p
                      style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-base)',
                        lineHeight: 1.8,
                        flex: 1,
                        fontStyle: 'italic',
                        margin: '0 0 28px',
                      }}
                    >
                      "{t.review}"
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: 'var(--color-border)',
                        marginBottom: '20px',
                      }}
                    />

                    {/* Guest */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--color-accent-light)',
                          border: '2px solid var(--color-accent-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: 'var(--color-accent)',
                          flexShrink: 0,
                        }}
                      >
                        {t.avatar}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--text-sm)',
                          }}
                        >
                          {t.name}
                        </div>

                        <div
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ══ CTA BANNER ══════════════════════════ */}
        <motion.section
          style={{ padding: '100px 0' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container">
            <motion.div
              variants={fadeUp}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '80px 48px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Decorative corner accents */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '120px',
                  height: '120px',
                  borderTop: '3px solid var(--color-accent-border)',
                  borderLeft: '3px solid var(--color-accent-border)',
                  borderRadius: 'var(--radius-lg) 0 0 0',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  borderBottom: '3px solid var(--color-accent-border)',
                  borderRight: '3px solid var(--color-accent-border)',
                  borderRadius: '0 0 var(--radius-lg) 0',
                }}
              />

              {/* Content */}
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                Limited Availability
              </span>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  maxWidth: '600px',
                  margin: '0 auto 16px',
                }}
              >
                Ready to Experience True Luxury?
              </h2>

              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-lg)',
                  maxWidth: '480px',
                  margin: '0 auto 40px',
                  lineHeight: 1.7,
                }}
              >
                Reserve your room today and discover why discerning travelers
                choose us for an unforgettable stay.
              </p>

              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button
                  onClick={() => navigate('/rooms')}
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 36px',
                    fontWeight: 700,
                    fontSize: 'var(--text-base)',
                    cursor: 'pointer',
                    transition: 'var(--transition-base)',
                    letterSpacing: '0.02em',
                  }}
                >
                  View All Rooms
                </button>

                {!isLogged && (
                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      background: 'transparent',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px 36px',
                      fontWeight: 500,
                      fontSize: 'var(--text-base)',
                      cursor: 'pointer',
                      transition: 'var(--transition-base)',
                    }}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}
