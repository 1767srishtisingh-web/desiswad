import { Compass, HeartHandshake, Wallet } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PageHeader from '../components/PageHeader.jsx';
import SupplierSection from '../components/sections/SupplierSection.jsx';
import Reviews from '../components/sections/Reviews.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function AboutPage() {
  useDocumentTitle(
    'About DesiSwad — why we built a mystery snack box',
    'DesiSwad started with a simple idea: discovering snacks should be exciting. Here is what we are trying to build.',
  );

  return (
    <>
      <PageHeader title="Why DesiSwad?" crumb="About" sub="The short version of what we are doing and why." />

      <section className="band">
        <div className="wrap about">
          <div>
            <p className="lead">
              DesiSwad started with a simple idea: discovering snacks should be exciting.
            </p>
            <p>
              Students and young professionals often live away from home and end up eating the same
              familiar snacks again and again. The shop downstairs stocks what sells fastest, and
              anything unfamiliar is a gamble with money that is already stretched.
            </p>
            <p>
              We want to bring variety back by curating interesting snacks from different local and
              regional sources into one affordable mystery box. Every week we buy from a different
              mix of shops and small food businesses, put a box together, and send it out without
              telling you what is in it.
            </p>
            <ul className="values">
              <li>
                <Compass size={18} aria-hidden="true" />
                <span>
                  <strong>Discovery over catalogue.</strong> We would rather send you one snack you
                  have never heard of than twenty you already know.
                </span>
              </li>
              <li>
                <Wallet size={18} aria-hidden="true" />
                <span>
                  <strong>Built for a hostel budget.</strong> Boxes start at ₹149, and that number
                  shapes everything we source.
                </span>
              </li>
              <li>
                <HeartHandshake size={18} aria-hidden="true" />
                <span>
                  <strong>Small sellers get the shelf space.</strong> Most of what we buy comes from
                  businesses without a distribution network.
                </span>
              </li>
            </ul>
          </div>

          <div className="mission">
            <h3>Our mission</h3>
            <p>Make snack discovery affordable, exciting and unexpected.</p>
          </div>
        </div>
      </section>

      <SupplierSection />
      <Reviews />
      <FinalCTA />
    </>
  );
}
