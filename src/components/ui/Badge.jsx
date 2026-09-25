export default function Badge({ children, variant = '', live = false, icon: Icon }) {
  return (
    <span className={`badge${variant ? ` badge--${variant}` : ''}`}>
      {live ? <i className="dot" aria-hidden="true" /> : null}
      {Icon ? <Icon size={14} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
