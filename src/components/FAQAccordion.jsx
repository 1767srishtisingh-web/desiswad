import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FAQAccordion({ items, idPrefix = 'faq', defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const btnId = `${idPrefix}-btn-${i}`;
        return (
          <div className="acc__item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={btnId}
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <span className="acc__icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="acc__panel">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
