import { useEffect, useRef, useState } from 'react';
import { Eye, Info, RotateCcw } from 'lucide-react';
import { DROP_CATEGORIES, SAMPLE_REVEAL } from '../data/drops.js';
import Button from './ui/Button.jsx';
import MysteryItem from './MysteryItem.jsx';

/**
 * Demo interaction: cards flip open one by one to show a *sample* of what a
 * box could hold. Actual weekly contents are different.
 */
export default function MysteryReveal({ id = 'reveal' }) {
  const [openCount, setOpenCount] = useState(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const revealing = openCount > 0 && openCount < SAMPLE_REVEAL.length;
  const done = openCount === SAMPLE_REVEAL.length;

  function reveal() {
    timers.current.forEach(clearTimeout);
    timers.current = SAMPLE_REVEAL.map((_, i) =>
      setTimeout(() => setOpenCount(i + 1), i * 260),
    );
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setOpenCount(0);
  }

  return (
    <div id={id}>
      <div className="mysterygrid">
        {SAMPLE_REVEAL.map((sample, i) => (
          <MysteryItem
            key={sample.id}
            item={i < openCount ? sample : DROP_CATEGORIES[i]}
            revealed={i < openCount}
          />
        ))}
      </div>

      <div className="row" style={{ marginTop: '1.2rem' }}>
        {!done ? (
          <Button onClick={reveal} icon={Eye} disabled={revealing}>
            {revealing ? 'Opening…' : 'Reveal a sample'}
          </Button>
        ) : (
          <Button onClick={reset} variant="secondary" icon={RotateCcw}>
            Seal it again
          </Button>
        )}
        <Button to="/order" variant="ghost">
          I want the real one
        </Button>
      </div>

      <p className="reveal__note" role="note">
        <Info size={15} aria-hidden="true" />
        Sample reveal — actual weekly contents may vary.
      </p>
    </div>
  );
}
