import { useCallback } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import Hero from '../components/sections/Hero.jsx';
import WhyDesiSwad from '../components/sections/WhyDesiSwad.jsx';
import ProblemSection from '../components/sections/ProblemSection.jsx';
import ThisWeeksBox from '../components/sections/ThisWeeksBox.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import WeeklyDrops from '../components/sections/WeeklyDrops.jsx';
import PastDrops from '../components/sections/PastDrops.jsx';
import RewardsTeaser from '../components/sections/RewardsTeaser.jsx';
import SupplierSection from '../components/sections/SupplierSection.jsx';
import Reviews from '../components/sections/Reviews.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import FAQPreview from '../components/sections/FAQPreview.jsx';
import InstagramSection from '../components/sections/InstagramSection.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function Home() {
  useDocumentTitle(
    'DesiSwad — A new mystery snack box every week',
    'DesiSwad curates regional, local and unexpected Indian snacks into one affordable mystery box that changes every week.',
  );

  const scrollToReveal = useCallback(() => {
    const target = document.getElementById('this-week');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Hero onRevealClick={scrollToReveal} />
      <WhyDesiSwad />
      <ThisWeeksBox />
      <ProblemSection />
      <HowItWorks />
      <WeeklyDrops />
      <PastDrops />
      <RewardsTeaser />
      <SupplierSection />
      <Reviews />
      <TrustSection />
      <FAQPreview />
      <InstagramSection />
      <FinalCTA />
    </>
  );
}
