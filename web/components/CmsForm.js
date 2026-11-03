'use client';
import { useState } from 'react';
import { Lines } from './Text';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Field sets follow Figma P13 Contact, P14 Free Audit (3 steps) and the P11 newsletter.
const ENGAGEMENT = ['Scoped project', 'Digital Growth Partnership', 'Free audit first', 'Not sure yet'];
const INDUSTRY = ['Luxury travel & accommodation', 'Luxury retail & eCommerce', 'Beauty, wellness & medspa', 'Medical & healthcare', 'B2B services & SaaS', 'Other'];
const FORMS = {
  contact: [[
    { name: 'name', label: 'Full name', required: true, autoComplete: 'name', placeholder: 'Your first and last name' },
    { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@company.co.za' },
    { name: 'company', label: 'Business name', required: true, autoComplete: 'organization', placeholder: 'Your company' },
    { name: 'website', label: 'Website', type: 'url', placeholder: 'https://yourbusiness.co.za' },
    { name: 'engagement', label: 'I’m interested in', type: 'select', required: true, options: ENGAGEMENT, placeholder: 'Choose an engagement' },
    { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: 'International format (optional)' },
    { name: 'message', label: 'What would you like to achieve?', type: 'textarea', required: true, full: true,
      placeholder: 'Tell us about your challenge, relevant systems and any target dates.', help: 'Please leave out passwords and sensitive customer information.' },
  ]],
  audit: [
    { title: 'Business Information', helper: 'Tell us about the business behind the website.', fields: [
      { name: 'company', label: 'Business name', required: true, autoComplete: 'organization', placeholder: 'Your registered or trading name' },
      { name: 'website', label: 'Website URL', type: 'url', required: true, placeholder: 'https://yourbusiness.co.za' },
      { name: 'industry', label: 'Industry', type: 'select', required: true, options: INDUSTRY, placeholder: 'Choose your industry' },
      { name: 'teamSize', label: 'Team size', type: 'select', required: true, options: ['1–9', '10–24', '25–49', '50–199', '200+'], placeholder: 'Select a range' },
      { name: 'marketingOwner', label: 'Marketing owner', type: 'select', required: true, options: ['Dedicated marketing manager', 'Marketing team', 'Founder / director', 'External agency', 'No one yet'], placeholder: 'Who leads marketing?' },
      { name: 'location', label: 'Location', placeholder: 'City or region (optional)' },
    ] },
    { title: 'Business Requirements', helper: 'Focus the review on the outcome that matters most.', fields: [
      { name: 'goal', label: 'Primary goal', type: 'select', required: true, options: ['More qualified enquiries', 'More direct bookings', 'More online sales', 'Less manual work', 'Better measurement'], placeholder: 'Choose your main priority' },
      { name: 'area', label: 'Area to improve', type: 'select', required: true, options: ['Strategy, UX & Conversion', 'Websites & Digital Products', 'Systems Integration & Automation', 'AI Integration', 'Growth Marketing & CRO', 'Dynamic QR Experiences', 'Not sure'], placeholder: 'Select a service area' },
      { name: 'challenge', label: 'What is holding you back?', type: 'textarea', required: true, full: true, placeholder: 'Tell us about the challenge, who it affects and the outcome you want.', help: 'Please leave out passwords and sensitive customer data.' },
      { name: 'platforms', label: 'Current platforms', placeholder: 'Website, CRM, booking or ERP tools' },
      { name: 'budget', label: 'Potential project budget', type: 'select', options: ['R50,000 – R100,000', 'R100,000 – R250,000', 'R250,000+', 'Not sure yet'], placeholder: 'Choose a range (optional)', help: 'Paid projects start at R50,000.' },
    ] },
    { title: 'Contact Information', helper: 'Who should we speak to about the findings?', fields: [
      { name: 'name', label: 'Full name', required: true, autoComplete: 'name', placeholder: 'Your first and last name' },
      { name: 'role', label: 'Role', required: true, autoComplete: 'organization-title', placeholder: 'Your role in the business' },
      { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email', placeholder: 'you@company.co.za' },
      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: 'International format (optional)' },
      { name: 'contactMethod', label: 'Preferred contact method', type: 'select', options: ['Email', 'Phone', 'WhatsApp'], placeholder: 'Email', help: 'We will use your details to respond to this request.' },
    ] },
  ],
  newsletter: [[
    { name: 'name', label: 'Name', autoComplete: 'given-name', placeholder: 'Jane' },
    { name: 'surname', label: 'Surname', autoComplete: 'family-name', placeholder: 'Doe' },
    { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email', placeholder: 'name@company.com', full: true },
    { name: 'consent', label: 'I agree to the privacy policy and terms and conditions.', type: 'checkbox', required: true, full: true },
  ]],
};

function Field({ f, form, values, setValues }) {
  const id = `${form}-${f.name}`;
  const v = values[f.name] ?? (f.type === 'checkbox' ? false : '');
  const set = (val) => setValues((p) => ({ ...p, [f.name]: val }));
  const common = { id, name: f.name, required: f.required, autoComplete: f.autoComplete, 'aria-describedby': f.help ? `${id}-h` : undefined };
  if (f.type === 'checkbox') {
    return (
      <label className="check" style={{ gridColumn: '1 / -1' }}>
        <input type="checkbox" {...common} checked={!!v} onChange={(e) => set(e.target.checked)} /> <span className="small">{f.label}</span>
      </label>
    );
  }
  return (
    <div className="field" style={f.full ? { gridColumn: '1 / -1' } : undefined}>
      <label htmlFor={id}>{f.label}{f.required && ' *'}</label>
      {f.type === 'textarea' ? <textarea rows={5} {...common} placeholder={f.placeholder} value={v} onChange={(e) => set(e.target.value)} />
        : f.type === 'select' ? (
          <select {...common} value={v} onChange={(e) => set(e.target.value)}>
            <option value="" disabled>{f.placeholder || 'Select…'}</option>{f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : <input type={f.type || 'text'} {...common} placeholder={f.placeholder} value={v} onChange={(e) => set(e.target.value)} />}
      {f.help && <small id={`${id}-h`} className="small">{f.help}</small>}
    </div>
  );
}

export default function CmsForm({ form = 'contact', submitLabel, privacy, success }) {
  const steps = FORMS[form] || FORMS.contact;
  const multi = steps.length > 1;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [state, setState] = useState({ status: 'idle', error: '' });
  const cur = multi ? steps[step] : { fields: steps[0] };
  const last = step === steps.length - 1;

  async function onSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (!last) { setStep(step + 1); return; }
    setState({ status: 'sending', error: '' });
    try {
      const hp = e.currentTarget.elements.company_website?.value;
      const res = await fetch(`${API}/api/forms/${form}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, company_website: hp }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setState({ status: 'done', error: '' });
    } catch (err) {
      setState({ status: 'idle', error: err.message });
    }
  }

  if (state.status === 'done') {
    const [head, ...rest] = (success || 'Thanks for the context.\nWe’ll review your requirements and contact you about a suitable next step.').split('\n');
    return (
      <div className="form-msg" role="status" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p className="label">Request received</p><p className="h3">{head}</p>{rest.length > 0 && <p className="body"><Lines text={rest.join('\n')} /></p>}
      </div>
    );
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      {multi && (
        <>
          <ol className="form-steps">{steps.map((s, i) => <li key={i} className={i === step ? 'on' : i < step ? 'done' : ''}>{String(i + 1).padStart(2, '0')}  {s.title.split(' ')[1]?.toUpperCase() || s.title}</li>)}</ol>
          <div><h3 className="h3">{cur.title}</h3><p className="small">{cur.helper}</p></div>
        </>
      )}
      <div className="form-grid">{cur.fields.map((f) => <Field key={f.name} f={f} form={form} values={values} setValues={setValues} />)}</div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: 'absolute', left: '-9999px' }} />
      {last && privacy && <p className="small">{privacy}</p>}
      {state.error && <p className="form-msg err" role="alert">{state.error}</p>}
      <div className="btn-row" style={{ justifyContent: 'space-between' }}>
        {multi && step > 0 ? <button type="button" className="btn btn-outline btn-back" onClick={() => setStep(step - 1)}>← Back</button> : <span />}
        {multi && <span className="small" style={{ alignSelf: 'center' }}>Step {step + 1} of {steps.length}</span>}
        <button className="btn btn-primary" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : !last ? 'Continue' : submitLabel || 'Send'}
        </button>
      </div>
    </form>
  );
}
