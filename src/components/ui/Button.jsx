import { Link } from 'react-router-dom';

/**
 * One button, three shapes: <button>, <Link> (to) or <a> (href).
 * variant: primary | secondary | ghost | gold | dark
 */
export default function Button({
  children,
  variant = 'primary',
  size,
  to,
  href,
  icon: Icon,
  iconAfter = false,
  block = false,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    variant !== 'primary' ? `btn--${variant}` : '',
    size ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {Icon && !iconAfter ? <Icon size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon && iconAfter ? <Icon size={18} aria-hidden="true" /> : null}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={rest.type || 'button'} {...rest}>
      {content}
    </button>
  );
}
