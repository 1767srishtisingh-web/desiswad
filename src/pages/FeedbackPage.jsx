import { useEffect, useState } from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { listFeedback } from '../services/feedbackService.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { shortDate } from '../utils/format.js';
import PageHeader from '../components/PageHeader.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Modal from '../components/ui/Modal.jsx';
import { SkeletonCard } from '../components/ui/Skeleton.jsx';

export default function FeedbackPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(null);

  useDocumentTitle(
    'Rate your drop — DesiSwad',
    'Tell DesiSwad what worked in your mystery box and what should never come back.',
  );

  useEffect(() => {
    listFeedback().then((list) => {
      setItems(list);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader
        title="Tell us what you think."
        crumb="Feedback"
        sub="Your box is open. Now decide what the next one looks like."
      />

      <section className="band band--tight">
        <div className="wrap order">
          <FeedbackForm
            onDone={(record) => {
              setItems((list) => [...list, record]);
              setDone(record);
            }}
          />

          <aside className="summary" aria-label="Your feedback history">
            <h2>What you have sent</h2>
            {loading ? (
              <SkeletonCard lines={2} />
            ) : items.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="Nothing yet"
                body="Send feedback on a drop and it will be listed here."
              />
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item) => (
                  <li className="summary__line" key={item.id}>
                    <span>
                      {item.id} · {shortDate(item.createdAt)}
                    </span>
                    <span>{item.rating}★</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="summary__note">Feedback earns 10 Swad Points per drop.</p>
          </aside>
        </div>
      </section>

      <Modal open={Boolean(done)} onClose={() => setDone(null)} title="Feedback received">
        {done ? (
          <div className="success">
            <span className="success__emoji" aria-hidden="true">
              <CheckCircle2 size={44} color="var(--leaf)" />
            </span>
            <h2>Noted, thank you.</h2>
            <p className="success__id">{done.id}</p>
            <p style={{ color: 'var(--muted)' }}>
              {done.rating}★ for this drop, and {done.favourite} goes on the shortlist for a repeat.
            </p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Button to="/rewards">See my points</Button>
              <Button variant="secondary" onClick={() => setDone(null)}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
