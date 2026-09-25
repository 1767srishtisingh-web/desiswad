export default function WeeklyDrop({ drop }) {
  return (
    <article className="dropcard" style={{ '--bar': drop.bar }}>
      <span className="dropcard__no">{drop.no}</span>
      <h3 className="dropcard__theme">{drop.theme}</h3>
      <p className="dropcard__note">{drop.note}</p>
      <div className="dropcard__tags">
        {drop.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
