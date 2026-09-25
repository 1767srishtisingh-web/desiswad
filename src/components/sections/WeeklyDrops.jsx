import { WEEKLY_DROPS } from '../../data/drops.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import WeeklyDrop from '../WeeklyDrop.jsx';

export default function WeeklyDrops() {
  return (
    <section className="band band--surface" aria-labelledby="weekly-title">
      <div className="wrap">
        <SectionHeading
          kicker="Every week is different"
          id="weekly-title"
          title="Same box idea. Never the same experience."
          sub="Examples of how a drop can be shaped. Themes are decided close to packing day, based on what we find."
        />
        <div className="grid grid-4">
          {WEEKLY_DROPS.map((drop) => (
            <WeeklyDrop drop={drop} key={drop.no} />
          ))}
        </div>
        <p className="fine" style={{ marginTop: '1.2rem' }}>
          Every drop is curated separately. These themes are illustrations, not a fixed rotation.
        </p>
      </div>
    </section>
  );
}
