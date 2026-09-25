import { MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faqs.js';
import { SITE } from '../data/site.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PageHeader from '../components/PageHeader.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import Button from '../components/ui/Button.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

export default function FAQPage() {
  useDocumentTitle(
    'DesiSwad FAQ — mystery boxes, delivery, rewards',
    'Answers about what is inside a DesiSwad mystery box, how weekly drops work, delivery, rewards and becoming a snack partner.',
  );

  return (
    <>
      <PageHeader title="Questions, answered" crumb="FAQ" sub="Everything people ask before their first box." />

      <section className="band">
        <div className="wrap-narrow">
          <FAQAccordion items={FAQS} idPrefix="faq-page" defaultOpen={0} />

          <div className="card" style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Still stuck?</h2>
            <p style={{ color: 'var(--muted)' }}>
              Message us on WhatsApp or email and a human will get back to you.
            </p>
            <div className="row">
              <Button href={SITE.whatsapp} icon={MessageCircle} variant="dark">
                WhatsApp us
              </Button>
              <Button href={`mailto:${SITE.email}`} variant="secondary">
                {SITE.email}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
