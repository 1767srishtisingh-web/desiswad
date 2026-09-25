import { PLANS } from '../../data/plans.js';
import BoxPlan from '../BoxPlan.jsx';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function BoxPlans({ showCadence = true }) {
  return (
    <section className="band" id="plans" aria-labelledby="plans-title">
      <div className="wrap">
        <SectionHeading
          kicker="Pick a size"
          id="plans-title"
          title="Two boxes. Both a surprise."
          sub="The only thing you choose is how much of it you want."
        />

        <div className="plans">
          {PLANS.map((plan) => (
            <BoxPlan plan={plan} key={plan.id} />
          ))}
        </div>

        <p className="fine" style={{ marginTop: '1rem' }}>
          Contents vary with every drop.
        </p>

        {showCadence ? (
          <div className="cadence">
            <div className="cadence__card">
              <h3>Try once</h3>
              <p>One mystery box, nothing recurring. Most people start here.</p>
              <Button to="/order?frequency=once" variant="secondary">
                Order one box
              </Button>
            </div>
            <div className="cadence__card">
              <h3>Keep the surprise coming</h3>
              <p>A box every week or every two weeks. You set the rhythm at checkout.</p>
              <Button to="/order?frequency=weekly">Set up repeats</Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
