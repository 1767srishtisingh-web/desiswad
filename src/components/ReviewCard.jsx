import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <figure className="review" style={{ margin: 0 }}>
      <div className="review__stars" aria-label={`${review.stars} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            aria-hidden="true"
            fill={i < review.stars ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <blockquote className="review__text">{review.text}</blockquote>
      <figcaption className="review__who">{review.who}</figcaption>
    </figure>
  );
}
