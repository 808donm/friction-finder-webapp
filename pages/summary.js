import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];
  const department = router.query.department || 'general';

  const text = answers.join(' ').toLowerCase();

  const patterns = {
    operations: ["manual", rework", "delay", "slow", "repeat", "spreadsheet"],
    revenue: ["follow-up", "leads", "sales", "pipeline", "conversion"],
    tech: ["tools", "systems", "platforms", "disconnected", "fragmented"]
  };

  const departmentInsights = {
    finance: "Manual reconciliations, disconnected reporting tools, and delayed forecasting are common friction points in finance. Automating these processes can free up capacity for strategic planning.",
    hr: "Friction in HR often stems from manual onboarding, fragmented employee data, and inconsistent compliance tracking. Centralized systems can help reduce workload and risk.",
    operations: "Operational teams frequently struggle with repetitive tasks, siloed workflows, and project visibility. Eliminating double-entry and integrating systems increases execution speed.",
    administration: "Admin friction often hides in scheduling, document management, and task tracking. Automating workflows and reminders reduces delays and improves accountability.",
    sales: "Lost leads and slow follow-up are common signs of friction in sales. Aligning CRM automation and sales intelligence can recover missed opportunities.",
    marketing: "Friction in marketing arises from tool overload, fragmented campaign data, and time-consuming content execution. A streamlined MarTech stack unlocks creative velocity."
  };

  const friction = [];

  // General pattern matching
  if (patterns.operations.some(w => text.includes(w))) {
    friction.push("Your operations may be bogged down by manual work, inefficiencies, or siloed workflows.");
  }

  if (patterns.revenue.some(w => text.includes(w))) {
    friction.push("Revenue may be leaking due to inconsistent follow-ups or untracked pipeline opportunities.");
  }

  if (patterns.tech.some(w => text.includes(w))) {
    friction.push("Fragmented tools or disconnected systems may be slowing your team down.");
  }

  // Add department-specific narrative
  if (department !== 'general' && departmentInsights[department]) {
    friction.unshift(departmentInsights[department]);
  }

  if (friction.length === 0) {
    friction.push("No clear friction was detected—though even smooth-running departments often hide time-wasting inefficiencies.");
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2>Executive Summary: {department.charAt(0).toUpperCase() + department.slice(1)}</h2>
      <p>Based on your responses, here are the most likely friction points affecting your {department} department:</p>
      <ul>
        {friction.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.75rem' }}>{item}</li>
        ))}
      </ul>

      <p>
        These inefficiencies are costing time, reducing focus, and limiting your capacity for strategic growth.
        Let’s eliminate them—securely, intelligently, and efficiently.
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
    </div>
  );
}
