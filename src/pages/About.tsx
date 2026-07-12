import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import CtaCard from '../components/CtaCard';
import HeroSection from '../components/HeroSection';
import aboutImage from '../assets/about.jpg';

const ctaData = {
  title: 'Ready to Experience Luxury?',
  description: 'Book your stay today and enjoy premium hospitality.',
};

const features = [
  {
    icon: '🏨',
    title: 'Luxury Experience',
    desc: 'Modern rooms designed for comfort and relaxation.',
  },
  {
    icon: '🛎️',
    title: '24/7 Service',
    desc: 'Friendly staff available anytime to assist guests.',
  },
  {
    icon: '🔒',
    title: 'Secure Booking',
    desc: 'Safe and encrypted booking and payment system.',
  },
  {
    icon: '📍',
    title: 'Prime Location',
    desc: 'Located near popular attractions and transportation.',
  },
];

const stats = [
  { value: '500+', label: 'Happy Guests' },
  { value: '50+', label: 'Luxury Rooms' },
  { value: '10+', label: 'Years Experience' },
  { value: '35+', label: 'Professional Staff' },
];

const team = [
  {
    name: 'John Smith',
    role: 'General Manager',
    icon: '👨‍💼',
  },
  {
    name: 'Emily Brown',
    role: 'Customer Relations',
    icon: '👩‍💼',
  },
  {
    name: 'David Wilson',
    role: 'Operations Manager',
    icon: '👨‍🍳',
  },
];

const dataHero = {
  title: 'About Our Hotel',
  heading: ' Hospitality Beyond Expectations',
  description:
    'We provide comfortable accommodation with exceptional service,modern facilities, and memorable experiences for every guest.',
};

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--color-bg-secondary)' }}>
        {/* HERO */}
        <HeroSection dataHero={dataHero} />
        {/* STORY */}

        <section className="py-5">
          <div className="container line-section">
            <div className="line-wrapper">
              <hr className="styled-line" />
              <div className="center-box">Our Story</div>
            </div>
            <div className="image-wrapper py-5 ">
              <img src={aboutImage} alt="Winter Landscape" />
              <div className="overlap-box">
                <h5>
                  By <a href="#">Dammar Bhatt</a>
                </h5>
                <p>
                  Since our establishment, our mission has been to create a
                  welcoming environment where every guest feels at home.
                </p>
                <p>
                  From luxury suites to affordable rooms, we combine comfort,
                  elegance and technology to deliver an unforgettable stay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section
          style={{
            padding: '80px 0',
            background: 'var(--color-bg-primary)',
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h2>Why Choose Us</h2>

              <p>Everything you need for a perfect stay.</p>
            </div>

            <div className="row g-4">
              {features.map((item) => (
                <div className="col-md-6 col-lg-3" key={item.title}>
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="custom-card p-5 h-100">
                  <h3>🎯 Our Mission</h3>

                  <p>
                    Deliver exceptional hospitality by providing premium rooms,
                    excellent customer service, and a seamless booking
                    experience.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="custom-card p-5 h-100">
                  <h3>🚀 Our Vision</h3>

                  <p>
                    Become one of the most trusted hotel booking platforms by
                    offering comfort, innovation and outstanding guest
                    satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section
          style={{
            background: 'var(--color-bg-primary)',
            padding: '80px 0',
          }}
        >
          <div className="container">
            <div className="row g-4">
              {stats.map((stat) => (
                <div className="col-md-3 col-6" key={stat.label}>
                  <div className="stat-card">
                    <div className="stat-value">{stat.value}</div>

                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* TEAM */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2>Meet Our Team</h2>
            </div>
            <div className="row g-4">
              {team.map((member) => (
                <div className="col-lg-4" key={member.name}>
                  <div className="custom-card p-5 text-center">
                    <div style={{ fontSize: '4rem' }}>{member.icon}</div>
                    <h4 className="mt-3">{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
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
