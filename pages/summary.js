import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : [];

  const text = data.join(' ').toLowerCase();
  const industryInput = data[1] || ''; // Q2 = industry

  const patterns = {
    operations: ["manual", "re-enter", "repeat", "slow", "delay", "rework", "duplicate"],
    revenue: ["follow-up", "leads", "sales", "pipeline", "conversion", "customer"],
    tech: ["tools", "systems", "platforms", "disconnected", "fragmented", "logins"]
  };

  const industryKeywords = {
    "real estate": ["real estate", "broker", "agent", "realtor"],
    "construction": ["construction", "contractor", "hvac", "plumbing", "builder"],
    "transportation": ["logistics", "trucking", "fleet", "delivery"],
    "finance": ["wealth", "advisor", "broker", "planner", "bank", "mortgage"],
    "healthcare": ["clinic", "medical", "dental", "care", "medicare"],
    "retail": ["store", "e-commerce", "inventory", "pos", "retail"]
  };

  const industryFriction = {
    "real estate": "Scattered communication and unsecured document workflows could be creating compliance risks and trust gaps with clients.",
    "construction": "Disconnected estimating, scheduling, and job tracking systems may be causing delays, cost overruns, and rework.",
    "transportation": "Fleet and dispatch fragmentation may lead to scheduling inefficiencies, higher costs, and service delays.",
    "finance": "Manual processes or non-compliant platforms could be exposing sensitive client data and impacting advisor productivity.",
    "healthcare": "Lack of workflow integration and unsecured messaging may create HIPAA exposure and operational drag.",
    "retail": "Inventory and POS misalignment can lead to stockouts, overstock, and lost revenue due to poor visibility."
  };

  // General friction detection
  const friction = [];

  if (patterns.operations.some(word => text.includes(word))) {
    friction.push("Manual or repetitive tasks may be slowing down your operations and wasting valuable staff time.");
  }

  if (patterns.revenue.some(word => text.includes(word))) {
    friction.push("Inconsistent sales or follow-up processes may be causing missed revenue opportunities.");
  }

  if (patterns.tech.some(word => text.includes(word))) {
    friction.push("Tech fragmentation is likely contributing to inefficiencies and poor visibility across your business.");
  }

  // Industry match
  let detectedIndustry = null;

  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(k => industryInput.toLowerCase().includes(k))) {
      detectedIndustry = industry;
      break;
    }
  }

  if (detectedIndustry && industryFriction[detectedIndustry]) {
    friction.unshift(industryFriction[detectedIndustry]);
  }

  if (friction.length === 0) {
    friction.push("No specific friction points were detected—however, deeper assessment often reveals hidden inefficiencies.");
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
        These issues may be reducing profitability, increasing employee stress, and putting your customer experience at risk.
      </p>
      <p>
        Book a First Time Appointment with our Fractional AI Officer to explore how automation and secure AI can help eliminate these friction points.
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
          Book an AI Strategy Call
        </button>
      </a>
    </div>
  );
}
