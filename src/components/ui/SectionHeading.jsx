export default function SectionHeading({ kicker, title, sub, center = false, id, as: Tag = 'h2' }) {
  return (
    <header className={`sechead${center ? ' sechead--center' : ''}`}>
      {kicker ? <span className="sechead__kicker">{kicker}</span> : null}
      <Tag id={id}>{title}</Tag>
      {sub ? <p className="sechead__sub">{sub}</p> : null}
    </header>
  );
}
