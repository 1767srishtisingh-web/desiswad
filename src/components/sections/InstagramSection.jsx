import { Instagram } from 'lucide-react';
import { SITE } from '../../data/site.js';
import Button from '../ui/Button.jsx';

const TILES = [
  { key: 't1', tile: '#E85D1F', label: 'Drop 01' },
  { key: 't2', tile: '#96162E', label: 'Packing' },
  { key: 't3', tile: '#F5B301', label: 'Shop A' },
  { key: 't4', tile: '#17614C', label: 'Reveal' },
  { key: 't5', tile: '#C44A13', label: 'Drop 02' },
  { key: 't6', tile: '#7A6455', label: 'Next' },
];

export default function InstagramSection() {
  return (
    <section className="band" aria-labelledby="insta-title">
      <div className="wrap insta">
        <div>
          <h2 id="insta-title">Follow the next drop.</h2>
          <p style={{ color: 'var(--muted)' }}>
            Each week&apos;s theme, the sourcing trips and the reveal go up on Instagram before they
            go anywhere else.
          </p>
          <p className="fine">Handle is a placeholder until the account is finalised.</p>
          <Button href={SITE.instagramUrl} icon={Instagram} variant="dark">
            Follow {SITE.instagram}
          </Button>
        </div>
        <div className="insta__tiles" aria-hidden="true">
          {TILES.map((t) => (
            <span className="insta__tile" key={t.key} style={{ '--tile': t.tile }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
