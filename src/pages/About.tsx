import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import CtaCard from '../components/CtaCard';
import HeroSection from '../components/HeroSection';
import { FaGithub } from 'react-icons/fa';
import { TiSocialLinkedin } from 'react-icons/ti';
import aboutImage from '../assets/about.jpg';
import WhyChooseSection from '../components/WhyChooseSection';
import dammar from '../assets/dammar.png';
import { motion } from 'framer-motion';
import { fadeUp, scaleUp, staggerContainer } from '../animations/motions';
import SharedStats from '../components/SharedStats';

const ctaData = {
  title: 'Ready to Experience Luxury?',
  description: 'Book your stay today and enjoy premium hospitality.',
};

const team = [
  {
    name: 'Dammar Bhatt',
    role: 'Founder & CEO',
    desc: 'Visionary leader with 10+ years in luxury hospitality management.',
    avatar: `${dammar}`,
    socials: {
      linkedin: 'https://www.linkedin.com/in/dammar-bhatt-0a41aa302/',
      Github: 'https://github.com/dammar2171',
    },
    tag: 'Leadership',
  },
  {
    name: 'Dheeraj Bokati',
    role: 'Head of Operations',
    desc: 'Ensures every guest experience exceeds the highest standards.',
    avatar:
      'https://api.dicebear.com/7.x/adventurer/svg?seed=Dheeraj&gender=female',
    socials: { linkedin: '#', twitter: '#' },
    tag: 'Operations',
  },
  {
    name: 'Prabin Jagari',
    role: 'Lead Developer',
    desc: 'Builds the technology that powers seamless booking experiences.',
    avatar:
      'https://api.dicebear.com/7.x/adventurer/svg?seed=Prabin&gender=male',
    socials: { linkedin: '#', twitter: '#' },
    tag: 'Technology',
  },
];

const dataHero = {
  title: 'About Our Hotel',
  heading: ' Hospitality Beyond Expectations',
  description:
    'We provide comfortable accommodation with exceptional service,modern facilities, and memorable experiences for every guest.',
};

export default function About() {
  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--color-bg-secondary)' }}>
        {/* HERO */}
        <HeroSection dataHero={dataHero} />
        {/* STORY */}
        <section
          className="py-5"
          style={{ background: 'var(--color-bg-secondary)' }}
        >
          <div className="container">
            {/* ── Section Label ──────────────────── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                position: 'relative',
                width: '100%',
                marginBottom: '60px',
              }}
            >
              <hr
                style={{
                  border: 'none',
                  borderTop: '1px solid var(--color-border)',
                  margin: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  padding: '10px 40px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                Our Story
              </div>
            </motion.div>

            {/* ── Story Content ───────────────────── */}
            <motion.div
              className="row align-items-center g-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Left — Text */}
              <motion.div
                className="col-lg-6 order-2 order-lg-1"
                variants={fadeUp}
              >
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '14px',
                  }}
                >
                  By Dammar Bhatt
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: '24px',
                  }}
                >
                  A Legacy of Comfort
                  <br />
                  <span style={{ color: 'var(--color-accent)' }}>
                    and Elegance
                  </span>
                </h2>

                <div
                  style={{
                    width: '48px',
                    height: '3px',
                    background: 'var(--color-accent)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '24px',
                  }}
                />

                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.8,
                    marginBottom: '16px',
                  }}
                >
                  Since our establishment, our mission has been to create a
                  welcoming environment where every guest feels at home.
                </p>

                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.8,
                    marginBottom: '32px',
                  }}
                >
                  From luxury suites to affordable rooms, we combine comfort,
                  elegance and technology to deliver an unforgettable stay.
                </p>

                {/* Mini stats */}
                <motion.div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  }}
                  variants={staggerContainer}
                >
                  {[
                    { value: '10+', label: 'Years' },
                    { value: '500+', label: 'Guests' },
                    { value: '50+', label: 'Rooms' },
                  ].map((s) => (
                    <motion.div
                      variants={scaleUp}
                      key={s.label}
                      style={{
                        background: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px 12px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          color: 'var(--color-accent)',
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
                          fontWeight: 500,
                        }}
                      >
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — Image */}
              <motion.div
                variants={fadeUp}
                className="col-lg-6 order-1 order-lg-2"
              >
                <div style={{ position: 'relative' }}>
                  {/* Main image */}
                  <img
                    src={aboutImage}
                    alt="Our Hotel Story"
                    style={{
                      width: '100%',
                      height: '420px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-lg)',
                      display: 'block',
                      boxShadow: 'var(--shadow-xl)',
                    }}
                  />

                  {/* Floating card — bottom left */}
                  <motion.div
                    variants={scaleUp}
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '-24px',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px 24px',
                      boxShadow: 'var(--shadow-lg)',
                      maxWidth: '220px',
                    }}
                    className="d-none d-md-block"
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                      🏆
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-sm)',
                        marginBottom: '4px',
                      }}
                    >
                      Award Winning
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Best Luxury Hotel 2024
                    </div>
                  </motion.div>

                  {/* Floating card — top right */}
                  <motion.div
                    variants={scaleUp}
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '-24px',
                      background: 'var(--color-accent)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px 20px',
                      boxShadow: 'var(--shadow-lg)',
                      textAlign: 'center',
                      minWidth: '100px',
                    }}
                    className="d-none d-md-block"
                  >
                    <div
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: 'var(--color-accent-text)',
                        lineHeight: 1,
                      }}
                    >
                      4.9
                    </div>
                    <div
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 'var(--text-xs)',
                        marginTop: '4px',
                      }}
                    >
                      ★★★★★
                    </div>
                    <div
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'var(--text-xs)',
                        marginTop: '2px',
                      }}
                    >
                      Guest Rating
                    </div>
                  </motion.div>

                  {/* Decorative border */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-12px',
                      right: '-12px',
                      width: '100px',
                      height: '100px',
                      borderBottom: '3px solid var(--color-accent-border)',
                      borderRight: '3px solid var(--color-accent-border)',
                      borderRadius: '0 0 var(--radius-lg) 0',
                      zIndex: -1,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <WhyChooseSection />

        {/* MISSION */}
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
            {/* ── Section Header ─────────────────── */}
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
                Who We Are
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
                Our Purpose &amp; Direction
              </h2>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-base)',
                  maxWidth: '480px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Guided by passion and driven by excellence — everything we do
                starts with our guests in mind
              </p>
            </motion.div>

            <motion.div className="row g-4" variants={staggerContainer}>
              {/* ── Mission Card ─────────────────── */}
              <motion.div variants={fadeUp} className="col-md-6">
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '48px 40px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'var(--transition-base)',
                  }}
                >
                  {/* Background number */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '24px',
                      fontSize: '8rem',
                      fontWeight: 900,
                      color: 'var(--color-border)',
                      lineHeight: 1,
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    01
                  </div>

                  {/* Top accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'var(--color-accent)',
                      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-accent-light)',
                      border: '1px solid var(--color-accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      marginBottom: '28px',
                    }}
                  >
                    🎯
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    Our Mission
                  </span>

                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '16px',
                    }}
                  >
                    Exceptional Hospitality,
                    <br />
                    Every Single Stay
                  </h3>

                  <div
                    style={{
                      width: '40px',
                      height: '3px',
                      background: 'var(--color-accent)',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '20px',
                    }}
                  />

                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 1.8,
                      marginBottom: '28px',
                    }}
                  >
                    Deliver exceptional hospitality by providing premium rooms,
                    excellent customer service, and a seamless booking
                    experience that exceeds every expectation.
                  </p>

                  {/* Key points */}
                  {[
                    'Premium rooms for every budget',
                    'Seamless booking experience',
                    'Guest satisfaction above all',
                  ].map((point) => (
                    <div
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--color-success-bg)',
                          border: '1px solid var(--color-success-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: 'var(--color-success)',
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </div>
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Vision Card ──────────────────── */}
              <motion.div className="col-md-6" variants={fadeUp}>
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '48px 40px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'var(--transition-base)',
                  }}
                >
                  {/* Background number */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '24px',
                      fontSize: '8rem',
                      fontWeight: 900,
                      color: 'var(--color-border)',
                      lineHeight: 1,
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    02
                  </div>

                  {/* Top accent line — different color */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background:
                        'linear-gradient(90deg, var(--color-accent), var(--color-accent-border))',
                      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-info-bg)',
                      border: '1px solid var(--color-info-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      marginBottom: '28px',
                    }}
                  >
                    🚀
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--color-info-text)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    Our Vision
                  </span>

                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '16px',
                    }}
                  >
                    The Most Trusted Name
                    <br />
                    In Hospitality
                  </h3>

                  <div
                    style={{
                      width: '40px',
                      height: '3px',
                      background: 'var(--color-info-text)',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '20px',
                    }}
                  />

                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 1.8,
                      marginBottom: '28px',
                    }}
                  >
                    Become one of the most trusted hotel booking platforms by
                    offering comfort, innovation and outstanding guest
                    satisfaction that sets the global standard.
                  </p>

                  {/* Key points */}
                  {[
                    'Globally trusted booking platform',
                    'Innovation at every touchpoint',
                    'Setting the standard for excellence',
                  ].map((point) => (
                    <div
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--color-info-bg)',
                          border: '1px solid var(--color-info-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: 'var(--color-info-text)',
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </div>
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* STATS */}
        <SharedStats />

        {/* ══ TEAM SECTION ══════════════════════ */}
        <section
          style={{
            padding: '100px 0',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <div className="container">
            {/* ── Section Header ───────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '64px' }}
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
                The People Behind
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
                Meet Our Team
              </h2>
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-base)',
                  maxWidth: '460px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Passionate professionals dedicated to crafting unforgettable
                experiences for every guest
              </p>
            </motion.div>

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.15 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="row g-4 justify-content-center"
            >
              {team.map((member, index) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  key={member.name}
                  className="col-lg-4 col-md-6"
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 'var(--shadow-card)',
                      transition: 'var(--transition-base)',
                      position: 'relative',
                    }}
                  >
                    {/* Top color banner */}
                    <div
                      style={{
                        height: '80px',
                        background:
                          index === 0
                            ? 'linear-gradient(135deg, #b45309, #f59e0b)'
                            : index === 1
                              ? 'linear-gradient(135deg, #0369a1, #38bdf8)'
                              : 'linear-gradient(135deg, #15803d, #4ade80)',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      {/* Index number */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '16px',
                          fontSize: '2.5rem',
                          fontWeight: 900,
                          color: 'rgba(255,255,255,0.15)',
                          lineHeight: 1,
                          userSelect: 'none',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Avatar — overlaps banner */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '-44px',
                        paddingBottom: '4px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: '88px',
                          height: '88px',
                          borderRadius: 'var(--radius-full)',
                          border: '3px solid var(--color-bg-card)',
                          boxShadow: 'var(--shadow-md)',
                          overflow: 'hidden',
                          background: 'var(--color-bg-tertiary)',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Card body */}
                    <div
                      style={{
                        padding: '16px 32px 32px',
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Role tag */}
                      <div style={{ marginBottom: '12px' }}>
                        <span
                          style={{
                            background: 'var(--color-accent-light)',
                            color: 'var(--color-accent)',
                            border: '1px solid var(--color-accent-border)',
                            padding: '3px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                          }}
                        >
                          {member.tag}
                        </span>
                      </div>

                      {/* Name */}
                      <h4
                        style={{
                          fontWeight: 800,
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-xl)',
                          marginBottom: '4px',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {member.name}
                      </h4>

                      {/* Role */}
                      <p
                        style={{
                          color: 'var(--color-accent)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 600,
                          marginBottom: '16px',
                        }}
                      >
                        {member.role}
                      </p>

                      {/* Divider */}
                      <div
                        style={{
                          width: '32px',
                          height: '2px',
                          background: 'var(--color-border)',
                          borderRadius: 'var(--radius-full)',
                          margin: '0 auto 16px',
                        }}
                      />

                      {/* Description */}
                      <p
                        style={{
                          color: 'var(--color-text-muted)',
                          fontSize: 'var(--text-sm)',
                          lineHeight: 1.7,
                          flex: 1,
                          marginBottom: '24px',
                        }}
                      >
                        {member.desc}
                      </p>

                      {/* Social links */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '10px',
                        }}
                      >
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.15 }}
                          href={member.socials.linkedin}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            color: 'var(--color-text-muted)',
                            transition: 'var(--transition-fast)',
                          }}
                        >
                          <TiSocialLinkedin />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.15 }}
                          href={member.socials.Github}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            color: 'var(--color-text-muted)',
                            transition: 'var(--transition-fast)',
                          }}
                        >
                          <FaGithub />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5">
          <div className="container">
            <CtaCard ctaData={ctaData} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
