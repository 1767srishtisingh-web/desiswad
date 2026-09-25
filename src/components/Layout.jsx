import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import MobileStickyCTA from './MobileStickyCTA.jsx';
import ScrollToTop from './ScrollToTop.jsx';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
