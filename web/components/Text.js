import Link from 'next/link';

// Admin text fields: newline = <br/>, **bold** = <strong>. Everything else is plain text (no HTML injection).
export function Lines({ text }) {
  if (!text) return null;
  return String(text).split('\n').map((line, i) => (
    <span key={i}>{i > 0 && <br />}{bold(line)}</span>
  ));
}
function bold(line) {
  return line.split(/(\*\*[^*]+\*\*)/).map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
}

export function Btn({ link, variant = 'primary' }) {
  if (!link?.label) return null;
  const href = link.href || '#';
  const cls = `btn btn-${link.style || variant}`;
  return /^https?:\/\//.test(href) ? <a className={cls} href={href} rel="noopener">{link.label}</a> : <Link className={cls} href={href}>{link.label}</Link>;
}
