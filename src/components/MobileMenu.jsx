import { useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../data/site.js';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js';
import Button from './ui/Button.jsx';

export default function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation();

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) onClose();
    // Close whenever the route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobilemenu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mobilemenu__top">
        <span className="brand">
          <img src={SITE.logo} alt="" width="34" height="34" />
          {SITE.name}
        </span>
        <button type="button" className="mobilemenu__close" onClick={onClose} aria-label="Close menu">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <ul className="mobilemenu__list">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) => `mobilemenu__link${isActive ? ' is-active' : ''}`}
            >
              {link.label}
              <ChevronRight size={20} aria-hidden="true" />
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/partner" onClick={onClose} className="mobilemenu__link">
            Snack partners
            <ChevronRight size={20} aria-hidden="true" />
          </NavLink>
        </li>
      </ul>

      <div className="mobilemenu__foot">
        <Button to="/order" block onClick={onClose}>
          Get this week&apos;s box
        </Button>
      </div>
    </div>
  );
}
