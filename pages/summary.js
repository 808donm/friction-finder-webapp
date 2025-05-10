
import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];
  const industry = router.query.industry || 'general';
  const department = router.query.department || 'general';

  const text = answers.join(' ').toLowerCase();

  const frictionByContext = {
    hr: "Manual onboarding, training gaps, or scattered employee records may expose the business to compliance and productivity risks.",
    sales: "Missed follow-ups, pipeline blind spots, or inconsistent CRM usage may be reducing revenue opportunities."
  };

  const friction = [];

  if (frictionByContext[department]) {
    friction.push(frictionByContext[department]);
  }

  if (friction.length === 0) {
    friction.push("No clear friction detected—yet most businesses have hidden inefficiencies just beneath the surface.");
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Friction Summary</h2>
      <p><strong>Industry:</strong> {industry.replace('_', ' ')}</p>
      <p><strong>Department:</strong> {department}</p>
      <ul>
        {friction.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>{item}</li>
        ))}
      </ul>
      <p>To address these issues, schedule your AI Strategy Call today.</p>
      <a href="https://strategy.cybersecurehawaii.com" target="_blank" rel="noopener noreferrer">
        <button style={{
          marginTop: '1rem',
          padding: '0.75rem 1.25rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>
          Book AI Strategy Call
        </button>
      </a>
    </div>
  );
}
