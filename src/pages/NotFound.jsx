import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  useDocumentTitle('Page not found — DesiSwad', 'This DesiSwad page does not exist.');

  return (
    <section className="notfound">
      <div className="wrap-narrow">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 style={{ fontSize: 'var(--step-3)' }}>This box is empty.</h1>
        <p style={{ color: 'var(--muted)', marginInline: 'auto' }}>
          The page you were looking for is not here. This week&apos;s drop is, though.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Button to="/">Back to home</Button>
          <Button to="/mystery-box" variant="secondary">
            See this week&apos;s box
          </Button>
        </div>
      </div>
    </section>
  );
}
