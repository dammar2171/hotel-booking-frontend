import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import CtaCard from '../components/CtaCard';
import HeroSection from '../components/HeroSection';
import { useState, type FormEvent } from 'react';
import type { Contact } from '../types';
import api from '../api/axios';
import { useToast } from '../contexts/ToastContext';
import WhyChooseSection from '../components/WhyChooseSection';
import MapSection from '../components/MapSection';

const ctaData = {
  title: 'Ready to book your stay?',
  description:
    'Explore our premium rooms and enjoy a memorable hotel experience.',
};

const contactInfo = [
  {
    icon: '📍',
    title: 'Our Location',
    value: 'Kathmandu, Nepal',
  },
  {
    icon: '📞',
    title: 'Phone',
    value: '+977 9800000000',
  },
  {
    icon: '✉️',
    title: 'Email',
    value: 'support@hotelbooking.com',
  },
  {
    icon: '🕒',
    title: 'Working Hours',
    value: '24 / 7 Support',
  },
];

const dataHero = {
  title: 'Contact Us',
  heading: "We'd Love To Hear From You",
  description:
    'Have questions about rooms, bookings or services? Send us a message and our team will respond as soon as possible.',
};

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/contacts', formData);
      if (res.data.success) {
        addToast(res?.data?.message || 'message sent!', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      addToast('Message failed', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--color-bg-secondary)' }}>
        {/* HERO */}
        <HeroSection dataHero={dataHero} />
        {/* CONTACT */}
        <section className="py-5">
          <div className="container">
            <div className="row g-5 d-md-flex justify-content-md-center align-items-center">
              {/* Contact Info */}
              <div className="col-lg-5">
                <h2 className="mb-4">Get In Touch</h2>
                {contactInfo.map((item) => (
                  <div key={item.title} className="custom-card p-4 mb-3">
                    <div className="d-flex">
                      <div
                        style={{
                          fontSize: '2rem',
                          marginRight: 20,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h5>{item.title}</h5>
                        <p className="mb-0">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* FORM */}
              <div className="col-lg-7">
                <div className="custom-card p-4">
                  <h3 className="mb-4">Send Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="custom-input"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          className="custom-input"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          className="custom-input"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          className="custom-input"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <textarea
                          rows={6}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="custom-input"
                          placeholder="Write your message..."
                        />
                      </div>
                      <div className="col-12">
                        <button className="btn-accent">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <MapSection />

        {/* WHY CONTACT */}
        <WhyChooseSection />

        {/* FAQ */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Frequently Asked Questions</h2>
            <div className="accordion" id="faq">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#one"
                  >
                    How do I book a room?
                  </button>
                </h2>
                <div
                  id="one"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#faq"
                >
                  <div className="accordion-body">
                    Browse available rooms, choose your preferred room and
                    complete the booking process online.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#two"
                  >
                    Can I cancel my booking?
                  </button>
                </h2>
                <div
                  id="two"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faq"
                >
                  <div className="accordion-body">
                    Yes. Cancellation depends on your room's cancellation
                    policy.
                  </div>
                </div>
              </div>
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
