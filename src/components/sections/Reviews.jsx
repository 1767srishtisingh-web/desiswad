import { REVIEWS } from '../../data/reviews.js';
import ReviewCard from '../ReviewCard.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function Reviews() {
  return (
    <section className="band" aria-labelledby="reviews-title">
      <div className="wrap">
        <SectionHeading
          kicker="Sample reviews"
          id="reviews-title"
          title="How we hope the box lands"
          sub="Written for this prototype to show the format. These are not real customer testimonials."
        />
        <div className="grid grid-3">
          {REVIEWS.map((r) => (
            <ReviewCard review={r} key={r.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
