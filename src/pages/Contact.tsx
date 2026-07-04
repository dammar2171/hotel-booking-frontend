import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import CtaCard from "../components/CtaCard";
import HeroSection from "../components/HeroSection";

const ctaData = {
    title:"Ready to book your stay?",
    description :"Explore our premium rooms and enjoy a memorable hotel experience."
}

const contactInfo = [
  {
    icon: "📍",
    title: "Our Location",
    value: "Kathmandu, Nepal",
  },
  {
    icon: "📞",
    title: "Phone",
    value: "+977 9800000000",
  },
  {
    icon: "✉️",
    title: "Email",
    value: "support@hotelbooking.com",
  },
  {
    icon: "🕒",
    title: "Working Hours",
    value: "24 / 7 Support",
  },
];

const reasons = [
  {
    icon: "⚡",
    title: "Quick Response",
    desc: "We usually reply within a few hours."
  },
  {
    icon: "🛎️",
    title: "24/7 Support",
    desc: "Our support team is always available."
  },
  {
    icon: "😊",
    title: "Friendly Staff",
    desc: "Professional team ready to help."
  },
  {
    icon: "🔒",
    title: "Secure Communication",
    desc: "Your information remains safe with us."
  }
];

const dataHero ={
    title:"Contact Us",
    heading:"We'd Love To Hear From You",
    description:"Have questions about rooms, bookings or services? Send us a message and our team will respond as soon as possible."
}

export default function Contact() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div style={{ background: "var(--color-bg-secondary)" }}>

                {/* HERO */}

               <HeroSection dataHero={dataHero}/>

                {/* CONTACT */}

                <section className="py-5">

                    <div className="container">

                        <div className="row g-5 d-md-flex justify-content-md-center align-items-center">

                            {/* Contact Info */}

                            <div className="col-lg-5">

                                <h2 className="mb-4">
                                    Get In Touch
                                </h2>

                                {contactInfo.map((item) => (

                                    <div
                                        key={item.title}
                                        className="custom-card p-4 mb-3"
                                    >

                                        <div className="d-flex">

                                            <div
                                                style={{
                                                    fontSize: "2rem",
                                                    marginRight: 20
                                                }}
                                            >
                                                {item.icon}
                                            </div>

                                            <div>

                                                <h5>{item.title}</h5>

                                                <p className="mb-0">
                                                    {item.value}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* FORM */}

                            <div className="col-lg-7">

                                <div className="custom-card p-4">

                                    <h3 className="mb-4">
                                        Send Message
                                    </h3>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="custom-input"
                                                placeholder="Full Name"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="custom-input"
                                                placeholder="Email Address"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="custom-input"
                                                placeholder="Phone Number"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="custom-input"
                                                placeholder="Subject"
                                            />
                                        </div>

                                        <div className="col-12 mb-3">

                                            <textarea
                                                rows={6}
                                                className="custom-input"
                                                placeholder="Write your message..."
                                            />

                                        </div>

                                        <div className="col-12">

                                            <button className="btn-accent">
                                                Send Message
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* WHY CONTACT */}

                <section
                    style={{
                        padding: "80px 0",
                        background: "var(--color-bg-primary)"
                    }}
                >

                    <div className="container">

                        <div className="text-center mb-5">

                            <h2>Why Contact Us?</h2>

                            <p>
                                Our team is always ready to assist you.
                            </p>
                        </div>
                        <div className="row g-4">
                            {reasons.map((item) => (
                                <div
                                    className="col-md-6 col-lg-3"
                                    key={item.title}
                                >
                                    <Card item={item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* FAQ */}

                <section className="py-5">

                    <div className="container">

                        <h2 className="text-center mb-5">
                            Frequently Asked Questions
                        </h2>

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

                                        Browse available rooms, choose your
                                        preferred room and complete the booking
                                        process online.

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

                                        Yes. Cancellation depends on your room's
                                        cancellation policy.

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* CTA */}

                <section className="py-5">

                    <div className="container">

                        <CtaCard ctaData={ctaData}/>

                    </div>

                </section>

            </div>

            <Footer />

        </>
    );
}