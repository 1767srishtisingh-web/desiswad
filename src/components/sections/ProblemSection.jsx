import { PROBLEMS } from '../../data/content.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';

export default function ProblemSection() {
  return (
    <section className="band" aria-labelledby="problem-title">
      <div className="wrap">
        <SectionHeading
          kicker="The problem"
          id="problem-title"
          title="Hostel life shouldn’t mean eating the same thing every day."
        />
        <div className="problems">
          {PROBLEMS.map((p) => (
            <article className="problem" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        <div className="pivot">
          <h3>So we made the surprise the product.</h3>
          <p>
            You pick the size and the taste you lean towards. We handle the hunting, and the box
            does the rest.
          </p>
          <Button to="/mystery-box" variant="gold">
            See this week&apos;s box
          </Button>
        </div>
      </div>
    </section>
  );
}
