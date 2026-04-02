'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield, Menu, X, DollarSign, Users, Clock, TrendingUp,
  CheckCircle, ChevronDown, Star, Phone, Mail, MapPin
} from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { faqData, testimonials, navItems } from '@/lib/data';
import Link from 'next/link';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState({
    name: '', email: '', message: ''
  });
  const { isMobile, isTablet } = useWindowSize();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      alert(`Thank you ${contactForm.name}! We've received your message and will get back to you within 24 hours.`);
      setContactForm({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={{ background: '#f8faf9', minHeight: '100vh' }}>
      {/* Fixed Navigation Header */}
      <div style={{
        padding: isMobile ? '12px 16px' : '15px 50px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)'
      }}>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Shield size={20} />
          </div>
          <div style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: 700, color: '#1a1a1a' }}>GigCrest</div>
        </button>

        {!isMobile && !isTablet && (
          <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            {navItems.map(item => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none', border: 'none', fontSize: '15px',
                  fontWeight: activeSection === item.id ? 700 : 500,
                  color: activeSection === item.id ? '#2563eb' : '#64748b',
                  cursor: 'pointer', padding: '8px 0',
                  borderBottom: activeSection === item.id ? '2px solid #2563eb' : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {!isMobile && (
            <>
              <Link href="/worker/dashboard" style={{ padding: '9px 18px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', textDecoration: 'none' }}>Worker</Link>
              <Link href="/admin/dashboard" style={{ padding: '9px 18px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', textDecoration: 'none' }}>Admin</Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ display: isMobile || isTablet ? 'flex' : 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', alignItems: 'center', justifyContent: 'center' }}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Slide-in Menu */}
      {isMenuOpen && (
        <>
          <div
            onClick={() => setIsMenuOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsMenuOpen(false)}
            role="button" tabIndex={0} aria-label="Close menu"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 998 }}
          />
          <div style={{
            position: 'fixed', top: 0, right: 0, width: isMobile ? '100%' : '300px', height: '100vh',
            background: 'white', boxShadow: '-5px 0 30px rgba(0,0,0,0.15)', zIndex: 999,
            padding: '70px 20px 30px', display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto'
          }}>
            <button
              type="button" onClick={() => setIsMenuOpen(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
            >
              <X size={28} />
            </button>

            {navItems.map(item => (
              <button
                type="button" key={item.id} onClick={() => scrollToSection(item.id)}
                style={{
                  background: activeSection === item.id ? '#eff6ff' : 'none', border: 'none',
                  fontSize: '16px', fontWeight: 600,
                  color: activeSection === item.id ? '#2563eb' : '#1a1a1a',
                  cursor: 'pointer', padding: '14px 16px', textAlign: 'left', borderRadius: '10px'
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #e2e8f0', margin: '15px 0' }} />
            <Link href="/worker/dashboard" onClick={() => setIsMenuOpen(false)} style={{ padding: '14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '15px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Worker Dashboard</Link>
            <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)} style={{ padding: '14px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '15px', marginTop: '8px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Admin Dashboard</Link>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="home" style={{ paddingTop: isMobile ? '80px' : '100px' }}>
        <div style={{
          maxWidth: isMobile ? '95%' : '500px', margin: '20px auto 40px',
          background: 'linear-gradient(180deg, #dce9f5 0%, #ffffff 30%)',
          borderRadius: isMobile ? '30px' : '40px', border: '4px solid #1a5fa8',
          boxShadow: '0 25px 80px rgba(0,0,0,0.2)', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ padding: isMobile ? '20px 20px 30px' : '20px 30px 40px', display: 'flex', alignItems: 'center', gap: '20px', flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
              <h1 style={{ fontSize: isMobile ? '28px' : '38px', fontWeight: 800, lineHeight: 1.2, color: '#1a1a1a', marginBottom: '8px' }}>Smart production for Morden Hustle.</h1>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#4a5568', marginBottom: '20px', fontWeight: 500 }}>Insurance for the gig economy.</p>
            </div>
            {!isMobile && (
              <div style={{ width: '280px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="delivery.png" alt="Delivery" style={{ width: '220px', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(37, 99, 235, 0.2))' }} />
              </div>
            )}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px', padding: isMobile ? '20px' : '25px 30px', margin: isMobile ? '0 20px 25px' : '0 30px 30px',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? '10px' : '20px',
            boxShadow: '0 15px 40px rgba(15, 23, 42, 0.4)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '22px' : '32px', fontWeight: 800, color: 'white', marginBottom: '5px' }}>3K+</div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#94a3b8', fontWeight: 500 }}>Workers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '22px' : '32px', fontWeight: 800, color: 'white', marginBottom: '5px' }}>₹49/</div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#94a3b8', fontWeight: 500 }}>Buy Week</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '22px' : '32px', fontWeight: 800, color: 'white', marginBottom: '5px' }}>&lt;1hr</div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#94a3b8', fontWeight: 500 }}>Payout</div>
            </div>
          </div>

          <div style={{ padding: isMobile ? '0 20px 30px' : '0 30px 40px' }}>
            <Link href="/worker/register" style={{
              display: 'block', width: '100%', padding: isMobile ? '16px' : '20px', background: '#2563eb', color: 'white',
              border: 'none', borderRadius: '50px', fontSize: isMobile ? '16px' : '18px', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box'
            }}>
              Register Now
            </Link>
          </div>

          <div style={{ height: '5px', background: '#1a1a1a', borderRadius: '0 0 36px 36px', width: '40%', margin: '0 auto' }}></div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: isMobile ? '50px 20px' : '100px 50px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 800, color: '#1a1a1a', marginBottom: '20px' }}>About GigCrest</h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#64748b', lineHeight: 1.8, marginBottom: '20px' }}>
                GigCrest was born from a simple observation: millions of gig workers in India lose income every day due to weather conditions beyond their control. We&apos;re here to change that.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#64748b', lineHeight: 1.8, marginBottom: '30px' }}>
                Our mission is to provide affordable, instant, and hassle-free insurance coverage to every gig economy worker in India.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}><CheckCircle size={18} /> No Paperwork</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}><CheckCircle size={18} /> Instant Claims</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: isMobile ? '14px' : '16px' }}><CheckCircle size={18} /> 24/7 Coverage</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              {[
                { icon: Users, color: '#2563eb', bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', value: '3K+', label: 'Workers Protected' },
                { icon: DollarSign, color: '#16a34a', bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', value: '₹20K+', label: 'Claims Paid' },
                { icon: Clock, color: '#ca8a04', bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', value: '<1hr', label: 'Avg Payout Time' },
                { icon: TrendingUp, color: '#db2777', bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', value: '84%', label: 'Income Protected' }
              ].map((stat, i) => (
                <div key={i} style={{ background: stat.bg, padding: isMobile ? '20px' : '25px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  {React.createElement(stat.icon, { size: isMobile ? 32 : 36, color: stat.color, style: { marginBottom: '12px' } })}
                  <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 800, color: '#1a1a1a' }}>{stat.value}</div>
                  <div style={{ fontSize: isMobile ? '13px' : '15px', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: isMobile ? '50px 20px' : '100px 50px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 800, color: '#1a1a1a', marginBottom: '15px' }}>What Our Workers Say</h2>
            <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Real stories from gig workers who&apos;ve experienced the GigCrest difference.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '25px' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                background: 'white', padding: isMobile ? '25px' : '30px', borderRadius: '18px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: 1.7, marginBottom: '22px', fontStyle: 'italic' }}>&quot;{testimonial.text}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px' }}>{testimonial.avatar}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{testimonial.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: isMobile ? '50px 20px' : '100px 50px', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 800, color: '#1a1a1a', marginBottom: '15px' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#64748b' }}>Everything you need to know about GigCrest.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqData.map((faq, index) => (
              <div key={index} style={{
                background: '#f8fafc', borderRadius: '14px', overflow: 'hidden',
                border: openFAQ === index ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <button type="button" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  style={{
                    width: '100%', padding: isMobile ? '18px' : '22px 25px', background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', textAlign: 'left', gap: '12px'
                  }}>
                  <span style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 600, color: '#1a1a1a' }}>{faq.question}</span>
                  <ChevronDown size={22} color="#64748b" style={{ transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', flexShrink: 0 }} />
                </button>
                <div style={{ maxHeight: openFAQ === index ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <p style={{ padding: isMobile ? '0 18px 18px' : '0 25px 22px', fontSize: isMobile ? '14px' : '15px', color: '#64748b', lineHeight: 1.7 }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: isMobile ? '50px 20px' : '100px 50px', background: 'linear-gradient(135deg, #0f4c3a 0%, #1b4332 50%, #0f2419 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 800, color: 'white', marginBottom: '20px' }}>Get In Touch</h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '35px' }}>Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you within 24 hours.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: Phone, label: 'Phone', value: '+91 1800-GIG-HELP' },
                  { icon: Mail, label: 'Email', value: 'support@gigcrest.in' },
                  { icon: MapPin, label: 'Address', value: 'WeWork, Cyber City, Gurugram' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {React.createElement(item.icon, { size: 22, color: '#4ade80' })}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ fontSize: isMobile ? '15px' : '17px', color: 'white', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: isMobile ? '25px' : '35px', borderRadius: '18px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '25px' }}>Send us a message</h3>
              <form onSubmit={handleContactSubmit}>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="name-input" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '6px' }}>Your Name</label>
                  <input id="name-input" type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Enter your name" style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="email-input" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '6px' }}>Email Address</label>
                  <input id="email-input" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="Enter your email" style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '22px' }}>
                  <label htmlFor="message-input" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '6px' }}>Message</label>
                  <textarea id="message-input" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="How can we help you?" rows={4} style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 25px rgba(22, 163, 74, 0.3)' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', padding: isMobile ? '30px 20px' : '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ width: '32px', height: '32px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Shield size={18} />
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>GigCrest</div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>© 2025 GigCrest. All rights reserved. | Protecting India&apos;s Gig Workers</p>
      </footer>
    </div>
  );
};

export default LandingPage;