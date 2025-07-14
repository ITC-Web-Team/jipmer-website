import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <> 
    <section class="contact-section">
    <div class="contact-header">
      <h1>CONTACT HQ<h1>CONTACT HQ</h1></h1>
      <p>Need help with registration, events, or accommodation? Our superhero support team is here to assist you!</p>
    </div>
    <div class="contact-grid">
      <div class="contact-card">
        <div class="contact-icon phone"></div>
        <h2>PHONE</h2>
        <p>+91 98765 43210<br/>+91 87654 32109</p>
      </div>
      <div class="contact-card">
        <div class="contact-icon email"></div>
        <h2>EMAIL</h2>
        <p>spandan2025@jipmer.edu.in<br/>info@spandan2025.com</p>
      </div>
      <div class="contact-card">
        <div class="contact-icon location"></div>
        <h2>LOCATION</h2>
        <p>JIPMER Campus<br/>Dhanvantari Nagar, Pondicherry</p>
      </div>
      <div class="contact-card">
        <div class="contact-icon hours"></div>
        <h2>OFFICE HOURS</h2>
        <p>Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 9:00 AM - 2:00 PM</p>
      </div>
    </div>
  </section>
  <section class="leadership-section">
    <h2 class="leadership-title">SPANDAN 2025 LEADERSHIP TEAM</h2>
    <div class="leadership-grid">
      <div class="leader-card">
        <div class="leader-avatar"></div>
        <div class="leader-info">
          <span class="leader-name">Suriya</span>
          <span class="leader-role president">President</span>
          <span class="leader-domain">Leadership</span>
          <span class="leader-contact">+91 9342150454</span>
        </div>
      </div>
      <div class="leader-card">
        <div class="leader-avatar"></div>
        <div class="leader-info">
          <span class="leader-name">Niranjana</span>
          <span class="leader-role vice-president">Vice-President</span>
          <span class="leader-domain">Leadership</span>
          <span class="leader-contact">+91 8825682153</span>
        </div>
      </div>
      <div class="leader-card">
        <div class="leader-avatar"></div>
        <div class="leader-info">
          <span class="leader-name">Nishit Anand</span>
          <span class="leader-role general-secretary">General Secretary</span>
          <span class="leader-domain">Administration</span>
          <span class="leader-contact">+91 7032368780</span>
        </div>
      </div>
    </div>
  </section>
  <section class="acc-catering-section">
    <div class="acc-cat-grid">
      <div class="acc-card accommodation">
        <div class="acc-icon">
          <span>&#128205;</span>
        </div>
        <h2>ACCOMMODATION</h2>
        <ul>
          <li>AC &amp; Non-AC rooms available</li>
          <li>On-campus housing</li>
          <li>Advance booking required</li>
          <li>Contact: Skand (9036849005)</li>
        </ul>
      </div>
      <div class="acc-card catering">
        <div class="acc-icon">
          <span>&#128172;</span>
        </div>
        <h2>CATERING</h2>
        <ul>
          <li>Room delivery service</li>
          <li>Multiple cuisine options</li>
          <li><a href='https://forms.gle/hAdPNqNpzFrZdoFS8'>Register via Google Form</a></li>
          <li>Contact: Harini (9994452417)</li>
          <li>Contact: Annanya (9626897335)</li>
        </ul>
      </div>
    </div>
  </section>
  <section class="reg-fees-section">
    <div class="reg-fees-container">
      <h2 class="reg-fees-title">REGISTRATION FEES OVERVIEW</h2>
      <div class="reg-fees-grid">
        <div class="reg-fees-card tiers">
          <h3>Registration Tiers</h3>
          <ul>
            <li>Tier 1 (Hero): ₹375</li>
            <li>Tier 2 (Super Hero): ₹650</li>
            <li>Tier 3 (Legend): ₹850</li>
          </ul>
        </div>
        <div class="reg-fees-card events">
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
  <section class="important-dates-section">
    <div class="important-dates-container">
      <div class="important-dates-header">
        <span class="important-dates-icon">&#128197;</span>
        <span class="important-dates-title">IMPORTANT DATES</span>
      </div>
      <div class="dates-grid">
        <div class="date-card">
          <span class="date-label">Registration Opens</span>
          <span class="date-value">July 18, 2025</span>
        </div>
        <div class="date-card">
          <span class="date-label">Early Bird Deadline</span>
          <span class="date-value">August 18, 2025</span>
        </div>
        <div class="date-card">
          <span class="date-label">Final Registration</span>
          <span class="date-value">August 29, 2025</span>
        </div>
        <div class="date-card">
          <span class="date-label">Festival Dates</span>
          <span class="date-value">August 25-30, 2025</span>
        </div>
      </div>
    </div>
  </section>
  <section class="follow-adventure-section">
    <div class="follow-adventure-container">
      <div class="follow-adventure-icon">&#127942;</div>
      <div class="follow-adventure-content">
        <span class="follow-adventure-title">FOLLOW THE ADVENTURE!</span>
        <p class="follow-adventure-desc">
          Stay updated with the latest news, announcements, and behind-the-scenes content
        </p>
        <div class="follow-adventure-links">
          <span class="adventure-link">@SPANDAN2025</span>
          <span class="adventure-sep">|</span>
          <span class="adventure-link">#ComicChronicles</span>
          <span class="adventure-sep">|</span>
          <span class="adventure-link">#JIPMER</span>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Contact