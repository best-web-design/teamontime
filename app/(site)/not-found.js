import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section center" style={{ minHeight: '50vh', justifyContent: 'center' }}>
      <p className="label">404</p>
      <h1 className="display">Page not found.</h1>
      <Link className="btn btn-primary" href="/">Back to home</Link>
    </section>
  );
}
