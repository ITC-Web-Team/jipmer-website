import React from 'react';
import './Footer.css';

export default function ComicFooter() {
  return (
    <footer className="comic-footer">
      <div className="comic-footer__grid">

        <div className="bubble">
          <h2 className="bubble__title">⚡ SPANDAN 2025</h2>
          <p className="bubble__subtitle">Comic Chronicles</p>
          <p className="bubble__text">
            Where medical excellence meets superhero adventure. Join us for the ultimate celebration of healthcare heroism!
          </p>
        </div>

        {/* <div className="bubble">
          <h3 className="bubble__title">🔗 Quick Links</h3>
          <ul className="bubble__list">
            <li>Events</li>
            <li>Registration</li>
            <li>About JIPMER</li>
            <li>Contact</li>
          </ul>
        </div> */}

        <div className="bubble">
          <h3 className="bubble__title">📞 Contact Info</h3>
          <p>✉️ spandan2025@jipmer.edu.in</p>
          <p>📱 +91 7032368780</p>
          <p>📍 JIPMER, Pondicherry</p>
          <p>📅 Aug 25–30, 2025</p>
        </div>

        <div className="bubble">
          <h3 className="bubble__title">📍 Find Us Here</h3>
          <a href="https://www.google.com/maps/dir/19.8508544,75.3270784/Jawaharlal+Institute+of+Postgraduate+Medical+Education+and+Research,+XQ2X%2B4VC,+Jipmer+Campus+Rd,+Jipmer+Campus,+Puducherry,+605006/@15.8572628,72.2586503,6z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x3a536116ef186149:0x8b03791390d53c79!2m2!1d79.7996561!2d11.9503155!3e0?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" className="map-placeholder">MAP</a>
          <p className="bubble__text small">Click map to get directions</p>
        </div>

      </div>

      <div className="comic-footer__bottom">
        <p>© 2025 SPANDAN – JIPMER Pondicherry. All rights reserved.</p>
        <p>❤️ Designed for medical superheroes</p>
        <button className="comic-footer__button">THE END… OR IS IT JUST THE BEGINNING?</button>
        <p className="comic-footer__hashtags">#ComicChronicles #SPANDAN2025</p>
        <p className="comic-footer__tagline">Be the hero healthcare needs!</p>
      </div>
    </footer>
  );
}