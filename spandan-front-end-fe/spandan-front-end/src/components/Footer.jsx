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
          <p>📱 +91 98765 43210</p>
          <p>📍 JIPMER, Pondicherry</p>
          <p>📅 Aug 25–30, 2025</p>
        </div>

        <div className="bubble">
          <h3 className="bubble__title">📍 Find Us Here</h3>
          <div className="map-placeholder">MAP</div>
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