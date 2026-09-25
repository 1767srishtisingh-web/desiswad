import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../data/site.js';
import { useScrolledPast } from '../hooks/useScrolledPast.js';
import Button from './ui/Button.jsx';
import MobileMenu from './MobileMenu.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(12);

  return (
    <>
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <nav className="wrap nav__inner" aria-label="Main">
          <Link to="/" className="brand">
            <img src={SITE.logo} alt="" width="36" height="36" />
            <span>
              {SITE.name}
              <span className="brand__tag">{SITE.tagline}</span>
            </span>
          </Link>

          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button to="/order" size="sm" className="btn--nav">
            Get the box
          </Button>

          <button
            type="button"
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
