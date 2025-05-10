import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];

  const text = answers.join(' ').toLowerCase();

  const patterns = {
    operations: ["manual", "re-enter", "repeat", "slow", "delay", "rework", "back and forth", "duplicate"],
    revenue: ["follow-up", "leads", "sales", "pipeline", "conversion", "close"],
    tech: ["tools", "systems", "platforms", "disconnected", "fragmented", "multiple logins"]
  };

  const friction = [];

  if (patterns.operations.some(word => text.includes(word))) {
    friction.push("Manual or repetitive tasks may be slowing down operations and wasting staff time.");
  }

  if (patterns.revenue.some(word => text.includes(word))) {
    friction.push("You may be missing out on revenue due to inconsistent sales or customer follow-up processes.");
  }

  if (patterns.tech.some(word => text.includes(word))) {
    friction.push("Tech fragmentation is causing miscommunication or inefficiency across departments.");
  }

  if (friction.length === 0) {
    friction.push("No specific friction points were detected—but most businesses have hidden inefficiencies that surface with deeper analysis.");
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2>Executive Summary</h2>
      <p>Based on your responses, we've identified the following friction points in your business:</p>
      <ul>
        {friction.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.75rem' }}>{item}</li>
        ))}
      </ul>

      <p>
        These friction points often contribute to missed revenue, reduced productivity, and lost competitive advantage.
        Let’s discuss how a Fractional AI Officer can help you eliminate friction, accelerate growth, and build a future-proof business.
      </p>

      <a href="https://strategy.cybersecurehawaii.com" target="_blank" rel="noopener noreferrer">
        <button style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>
          Book an AI Strategy call
        </button>
      </a>
    </div>
  );
}
