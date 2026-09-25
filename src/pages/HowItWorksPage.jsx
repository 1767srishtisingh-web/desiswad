import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PageHeader from '../components/PageHeader.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import SupplierSection from '../components/sections/SupplierSection.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import FAQPreview from '../components/sections/FAQPreview.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function HowItWorksPage() {
  useDocumentTitle(
    'How DesiSwad works — sourcing, curation, packing',
    'How a DesiSwad mystery box is sourced from local sellers, curated, checked and packed each week.',
  );

  return (
    <>
      <PageHeader
        title="How it works"
        crumb="How It Works"
        sub="From a shop counter somewhere in India to a sealed box in your room."
      />
      <HowItWorks />
      <SupplierSection />
      <TrustSection />
      <FAQPreview count={4} />
      <FinalCTA />
    </>
  );
}
