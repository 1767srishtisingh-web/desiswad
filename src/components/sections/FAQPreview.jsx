import { ArrowRight } from 'lucide-react';
import { FAQS } from '../../data/faqs.js';
import Button from '../ui/Button.jsx';
import FAQAccordion from '../FAQAccordion.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function FAQPreview({ count = 5 }) {
  return (
    <section className="band band--surface" aria-labelledby="faqp-title">
      <div className="wrap-narrow">
        <SectionHeading kicker="Questions" id="faqp-title" title="The ones people ask first" />
        <FAQAccordion items={FAQS.slice(0, count)} idPrefix="home-faq" defaultOpen={0} />
        <div style={{ marginTop: '1.4rem' }}>
          <Button to="/faq" variant="secondary" icon={ArrowRight} iconAfter>
            Read all {FAQS.length} questions
          </Button>
        </div>
      </div>
    </section>
  );
}
