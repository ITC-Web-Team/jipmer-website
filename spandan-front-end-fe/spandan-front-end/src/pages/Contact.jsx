import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <>
      <section className="spandan-contact-section">
        <div className="spandan-contact-header">
          <h1 className="spandan-contact-title">CONTACT HQ</h1>
          <p className="spandan-contact-description">
            Need help with registration, events, or accommodation? Our superhero support team is here to assist you!
          </p>
        </div>
        <div className="spandan-contact-grid">
          <div className="spandan-contact-card">
            <div className="spandan-contact-icon spandan-phone"></div>
            <h2 className="spandan-contact-label">PHONE</h2>
            <p className="spandan-contact-text">+91 98765 43210<br />+91 87654 32109</p>
          </div>
          <div className="spandan-contact-card">
            <div className="spandan-contact-icon spandan-email"></div>
            <h2 className="spandan-contact-label">EMAIL</h2>
            <p className="spandan-contact-text">spandan2025@jipmer.edu.in<br />info@spandan2025.com</p>
          </div>
          <div className="spandan-contact-card">
            <div className="spandan-contact-icon spandan-location"></div>
            <h2 className="spandan-contact-label">LOCATION</h2>
            <p className="spandan-contact-text">JIPMER Campus<br />Dhanvantari Nagar, Pondicherry</p>
          </div>
          <div className="spandan-contact-card">
            <div className="spandan-contact-icon spandan-hours"></div>
            <h2 className="spandan-contact-label">OFFICE HOURS</h2>
            <p className="spandan-contact-text">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
          </div>
        </div>
      </section>

      <section className="spandan-leadership-section">
        <h2 className="spandan-leadership-title">SPANDAN 2025 LEADERSHIP TEAM</h2>
        <div className="spandan-leadership-grid">
          <div className="spandan-leader-card">
            <div className="spandan-leader-avatar"></div>
            <div className="spandan-leader-info">
              <span className="spandan-leader-name">Suriya</span>
              <span className="spandan-leader-role spandan-president">President</span>
              <span className="spandan-leader-domain">Leadership</span>
              <span className="spandan-leader-contact">+91 9342150454</span>
            </div>
          </div>
          <div className="spandan-leader-card">
            <div className="spandan-leader-avatar"></div>
            <div className="spandan-leader-info">
              <span className="spandan-leader-name">Niranjana</span>
              <span className="spandan-leader-role spandan-vice-president">Vice-President</span>
              <span className="spandan-leader-domain">Leadership</span>
              <span className="spandan-leader-contact">+91 8825682153</span>
            </div>
          </div>
          <div className="spandan-leader-card">
            <div className="spandan-leader-avatar"></div>
            <div className="spandan-leader-info">
              <span className="spandan-leader-name">Nishit Anand</span>
              <span className="spandan-leader-role spandan-general-secretary">General Secretary</span>
              <span className="spandan-leader-domain">Administration</span>
              <span className="spandan-leader-contact">+91 7032368780</span>
            </div>
          </div>
        </div>
      </section>

      <section className="spandan-acc-catering-section">
        <div className="spandan-acc-cat-grid">
          <div className="spandan-acc-card spandan-accommodation">
            <div className="spandan-acc-icon">
              <span>&#128205;</span>
            </div>
            <h2 className="spandan-acc-title">ACCOMMODATION</h2>
            <ul className="spandan-acc-list">
              <li>AC & Non-AC rooms available</li>
              <li>On-campus housing</li>
              <li>Advance booking required</li>
              <li>Contact: Skand (9036849005)</li>
            </ul>
          </div>
          <div className="spandan-acc-card spandan-catering">
            <div className="spandan-acc-icon">
              <span>&#128172;</span>
            </div>
            <h2 className="spandan-acc-title">CATERING</h2>
            <ul className="spandan-acc-list">
              <li>Room delivery service</li>
              <li>Multiple cuisine options</li>
              <li><a href='https://forms.gle/hAdPNqNpzFrZdoFS8'>Register via Google Form</a></li>
              <li>Contact: Harini (9994452417)</li>
              <li>Contact: Annanya (9626897335)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="spandan-reg-fees-section">
        <div className="spandan-reg-fees-container">
          <h2 className="spandan-reg-fees-title">REGISTRATION FEES OVERVIEW</h2>
          <div className="spandan-reg-fees-grid">
            <div className="spandan-reg-fees-card spandan-tiers">
              <h3>Registration Tiers</h3>
              <ul>
                <li>Tier 1 (Hero): ₹375</li>
                <li>Tier 2 (Super Hero): ₹650</li>
                <li>Tier 3 (Legend): ₹850</li>
              </ul>
            </div>
            <div className="spandan-reg-fees-card spandan-events">
              <h3>Individual Event Fees</h3>
              <ul>
                <li>Cultural Events: ₹100-250</li>
                <li>Sports Events: ₹250-350</li>
                <li>Fine Arts: ₹100-125</li>
                <li>Literary/Online: ₹50-250</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="spandan-important-dates-section">
        <div className="spandan-important-dates-container">
          <div className="spandan-important-dates-header">
            <span className="spandan-important-dates-icon">&#128197;</span>
            <span className="spandan-important-dates-title">IMPORTANT DATES</span>
          </div>
          <div className="spandan-dates-grid">
            <div className="spandan-date-card">
              <span className="spandan-date-label">Registration Opens</span>
              <span className="spandan-date-value">July 18, 2025</span>
            </div>
            <div className="spandan-date-card">
              <span className="spandan-date-label">Early Bird Deadline</span>
              <span className="spandan-date-value">August 18, 2025</span>
            </div>
            <div className="spandan-date-card">
              <span className="spandan-date-label">Final Registration</span>
              <span className="spandan-date-value">August 29, 2025</span>
            </div>
            <div className="spandan-date-card">
              <span className="spandan-date-label">Festival Dates</span>
              <span className="spandan-date-value">August 25-30, 2025</span>
            </div>
          </div>
        </div>
      </section>

      <section className="spandan-follow-adventure-section">
        <div className="spandan-follow-adventure-container">
          <div className="spandan-follow-adventure-icon">&#127942;</div>
          <div className="spandan-follow-adventure-content">
            <span className="spandan-follow-adventure-title">FOLLOW THE ADVENTURE!</span>
            <p className="spandan-follow-adventure-desc">
              Stay updated with the latest news, announcements, and behind-the-scenes content
            </p>
            <div className="spandan-follow-adventure-links">
              <span className="spandan-adventure-link">@SPANDAN2025</span>
              <span className="spandan-adventure-sep">|</span>
              <span className="spandan-adventure-link">#ComicChronicles</span>
              <span className="spandan-adventure-sep">|</span>
              <span className="spandan-adventure-link">#JIPMER</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;