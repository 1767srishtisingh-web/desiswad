import { Lock } from 'lucide-react';

/**
 * A single slot in the box. Locked by default; `revealed` flips it open
 * during the sample-reveal demo.
 */
export default function MysteryItem({ item, revealed = false }) {
  return (
    <article className={`mitem${revealed ? ' is-revealed' : ''}`}>
      {!revealed ? <Lock className="mitem__lock" size={14} aria-hidden="true" /> : null}
      <span className="mitem__mark" style={{ '--tint': item.tint }} aria-hidden="true">
        {revealed ? item.emoji : '?'}
      </span>
      <h3 className="mitem__label">{revealed ? item.label : 'Mystery snack'}</h3>
      <p className="mitem__hint">{revealed ? item.hint : item.label.toLowerCase()}</p>
      {!revealed ? <span className="mitem__blur" aria-hidden="true" /> : null}
      <span className="sr-only">
        {revealed ? `Sample item: ${item.label}` : `Hidden slot: ${item.label}`}
      </span>
    </article>
  );
}
