import { PackageOpen } from 'lucide-react';

export default function EmptyState({ icon: Icon = PackageOpen, title, body, action }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{title}</h3>
      {body ? <p className="fine" style={{ margin: 0, maxWidth: '44ch' }}>{body}</p> : null}
      {action}
    </div>
  );
}
