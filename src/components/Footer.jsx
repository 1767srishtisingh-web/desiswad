import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, SITE } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <span className="footer__brand">
              <img src={SITE.logo} alt="" width="40" height="40" />
              {SITE.name}
            </span>
            <p style={{ marginTop: '0.6rem', color: '#c9b3a2' }}>{SITE.tagline}</p>
            <p style={{ fontSize: '0.9rem', maxWidth: '34ch' }}>
              A new mystery snack box every week, curated from local and regional sellers.
            </p>
            <p style={{ fontSize: '0.82rem', color: '#bfa896' }}>{SITE.city}</p>
          </div>

          <nav aria-label="Footer">
            <h4>Explore</h4>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={`${link.to}-${link.label}`}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__social">
            <h4>Say hello</h4>
            <ul>
              <li>
                <a href={SITE.instagramUrl} target="_blank" rel="noreferrer noopener">
                  <Instagram size={16} aria-hidden="true" />
                  {SITE.instagram}
                </a>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener">
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link to="/partner">Become a snack partner</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 {SITE.name}. All rights reserved.</span>
          <span>Prototype build — orders, points and forms are stored in your browser only.</span>
        </div>
      </div>
    </footer>
  );
}
