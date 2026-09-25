import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PageHeader from '../components/PageHeader.jsx';
import ThisWeeksBox from '../components/sections/ThisWeeksBox.jsx';
import BoxPlans from '../components/sections/BoxPlans.jsx';
import WeeklyDrops from '../components/sections/WeeklyDrops.jsx';
import PastDrops from '../components/sections/PastDrops.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function MysteryBoxPage() {
  useDocumentTitle(
    'This week’s mystery box — DesiSwad',
    'See this week’s DesiSwad mystery drop: categories, price, box sizes and past drops.',
  );

  return (
    <>
      <PageHeader
        title="The mystery box"
        crumb="Mystery Box"
        sub="One product, rebuilt every week from whatever we find worth sending."
      />
      <ThisWeeksBox />
      <BoxPlans />
      <WeeklyDrops />
      <PastDrops />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
