import { Link } from 'react-router-dom';

export default function PageHeader({ title, sub, crumb }) {
  return (
    <header className="pagehead">
      <div className="wrap">
        <p className="pagehead__crumb">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> {crumb || title}
        </p>
        <h1>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
    </header>
  );
}
