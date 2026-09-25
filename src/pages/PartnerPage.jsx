import { useState } from 'react';
import { CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { SITE } from '../data/site.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PageHeader from '../components/PageHeader.jsx';
import SupplierForm from '../components/SupplierForm.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { PARTNERS } from '../data/partners.js';

export default function PartnerPage() {
  const [lead, setLead] = useState(null);

  useDocumentTitle(
    'Become a DesiSwad snack partner',
    'Supply your regional or local snack to DesiSwad mystery boxes. Share your product, pricing and packaging details.',
  );

  return (
    <>
      <PageHeader
        title="Have a snack worth discovering?"
        crumb="Snack partners"
        sub="We buy from small food businesses every week. Tell us what you make."
      />

      <section className="band band--tight">
        <div className="wrap order">
          <SupplierForm onDone={setLead} />

          <aside className="summary" aria-label="What happens next">
            <h2>What happens next</h2>
            <ol style={{ paddingLeft: '1.1rem', margin: 0 }}>
              <li>We read every submission before the next sourcing round.</li>
              <li>If your product fits an upcoming theme, we call to discuss quantity.</li>
              <li>We buy a trial batch and put it in one drop.</li>
              <li>Customer feedback decides whether it comes back.</li>
            </ol>
            <p className="summary__note">
              Prefer to talk first? Message us and we&apos;ll answer from the same inbox.
            </p>
            <div className="row">
              <Button href={SITE.whatsapp} icon={MessageCircle} variant="dark" size="sm">
                WhatsApp
              </Button>
              <Button href={`mailto:${SITE.email}`} icon={Mail} variant="secondary" size="sm">
                Email
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="band band--surface" aria-labelledby="who-title">
        <div className="wrap">
          <SectionHeading
            kicker="Who we buy from"
            id="who-title"
            title="The kind of sellers already in the box"
            sub="Shops, home kitchens and small manufacturers — the sample cards below show the mix we aim for."
          />
          <div className="grid grid-4">
            {PARTNERS.map((p) => (
              <article className="partner" key={p.id}>
                <span className="partner__avatar" style={{ '--tint': p.tint }} aria-hidden="true">
                  {p.initial}
                </span>
                <span className="partner__name">{p.name}</span>
                <span className="partner__what">{p.what}</span>
                <span className="partner__where">{p.where}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Modal open={Boolean(lead)} onClose={() => setLead(null)} title="Submission received">
        {lead ? (
          <div className="success">
            <span className="success__emoji" aria-hidden="true">
              <CheckCircle2 size={44} color="var(--leaf)" />
            </span>
            <h2>Thanks, {lead.owner}.</h2>
            <p className="success__id">{lead.id}</p>
            <p style={{ color: 'var(--muted)' }}>
              We have your details for {lead.product} from {lead.business}. If it fits an upcoming
              drop, we&apos;ll get in touch on {lead.phone}.
            </p>
            <p className="fine">Demo submission — saved in this browser only.</p>
            <Button onClick={() => setLead(null)}>Close</Button>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
