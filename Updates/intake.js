
import { useState } from 'react';
import { useRouter } from 'next/router';

const questionSets = {
  general: {
    sales: [
      "How often do leads slip through the cracks?",
      "Is follow-up timing automated or based on memory?",
      "Are you tracking deals in a CRM or via spreadsheets?",
      "Where is the sales cycle being delayed unnecessarily?",
      "Do you have automation to re-engage cold leads?"
    ],
    finance: [
      "Are your financial reports generated automatically or manually?",
      "Do you spend more time gathering data or analyzing it?",
      "How do you track outstanding invoices and collections?",
      "Do you reconcile data between systems manually?",
      "What’s one financial process that needs serious streamlining?"
    ],
    operations: [
      "Are your processes documented or ad hoc?",
      "Which department causes the most frequent delays?",
      "Do teams use standardized tools or a mix?",
      "Is project status visible across the org?",
      "Do you rely on spreadsheets for core operations?"
    ]
  },
  real_estate: {
    sales: [
      "Are lead inquiries followed up within 24 hours?",
      "Do you track which channels generate the most buyer interest?",
      "Are deals managed in a CRM or via spreadsheets?",
      "How do you handle multiple listing pipelines?",
      "Do you use automation to stay top of mind with prospects?"
    ],
    operations: [
      "How do you coordinate listings, showings, and open houses?",
      "Are client handoffs between agents and admin smooth?",
      "Is document management manual or systemized?",
      "How do you track transaction timelines and compliance?",
      "Where do you see the most back-and-forth during deals?"
    ]
  },
  transportation: {
    operations: [
      "How are delivery schedules managed and updated in real-time?",
      "Do dispatch and fleet teams use integrated tools or spreadsheets?",
      "How is fuel usage, vehicle maintenance, and downtime tracked?",
      "Are driver logs, safety checks, and compliance digital or manual?",
      "Where do delays most often occur in your logistics pipeline?"
    ],
    finance: [
      "How do you track revenue per route or contract?",
      "Are vehicle costs and maintenance tracked per asset?",
      "Is invoicing tied to route completion or delivery metrics?",
      "Where are collections delayed in your AR process?",
      "How are margins calculated across your delivery network?"
    ]
  },
  retail: {
    operations: [
      "How is inventory tracked between storefronts and eCommerce?",
      "Are restocks automated or triggered manually?",
      "How do you track shrinkage or overstock issues?",
      "Is POS data integrated with your CRM and inventory?",
      "What’s the most frequent operational bottleneck?"
    ],
    marketing: [
      "Are campaign results tracked across all channels?",
      "Do you personalize promotions by segment or behavior?",
      "Is email or SMS marketing automated or manually managed?",
      "Where do you see the most content bottlenecks?",
      "What marketing tool is most underutilized?"
    ]
  },
  insurance: {
    sales: [
      "Are leads coming from referrals, lists, or digital campaigns?",
      "Is follow-up structured by product type or life event?",
      "How do you track quotes and conversion stages?",
      "Is appointment setting automated or manual?",
      "Are policy cross-sell opportunities proactively flagged?"
    ],
    operations: [
      "How are claims or client documents managed and tracked?",
      "Are underwriting tasks digital or paper-based?",
      "How often do clients complain about communication delays?",
      "Do you track renewal opportunities and lapses effectively?",
      "What systems are most often duplicated?"
    ]
  },
  dod: {
    operations: [
      "Are compliance tasks like CMMC or NIST tracked in a system?",
      "Is your documentation versioned and auditable?",
      "Do you manage project handoffs securely and consistently?",
      "Are contract deliverables tracked by a centralized PMO?",
      "Where is the most rework or redundancy today?"
    ],
    finance: [
      "Do you have clear audit trails for cost tracking?",
      "Are indirect costs calculated correctly across contracts?",
      "Is your invoicing DCAA-compliant?",
      "Where are cost overruns or delays creating billing issues?",
      "Do you forecast funding and burn rate in real time?"
    ]
  },
  manufacturing: {
    operations: [
      "Are production schedules optimized or manually adjusted?",
      "How do you track equipment downtime and maintenance?",
      "Are inventory inputs tied to production usage?",
      "Do quality issues surface early or late in the process?",
      "How do you measure throughput vs. labor cost?"
    ],
    finance: [
      "Is waste tracked and costed accurately?",
      "Do you report by product line or manufacturing cell?",
      "Are raw materials priced and allocated consistently?",
      "How are margins analyzed over time?",
      "Do you reconcile production volume with revenue forecasts?"
    ],
    hr: [
      "How is compliance training and OSHA tracking handled?",
      "Are shift schedules balanced and integrated with payroll?",
      "Is onboarding standardized across locations?",
      "Where do you lose the most time onboarding new hires?",
      "Do you track turnover and absenteeism trends?"
    ]
  }
};

export default function Intake() {
  const router = useRouter();
  const [industry, setIndustry] = useState('');
  const [department, setDepartment] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');

  const handleNext = () => {
    if (!input.trim()) return;
    const updated = [...answers, input.trim()];
    setAnswers(updated);
    setInput('');
    if (step + 1 < questionList.length) {
      setStep(step + 1);
    } else {
      router.push({
        pathname: '/summary',
        query: {
          data: JSON.stringify(updated),
          industry,
          department
        }
      });
    }
  };

  const industries = Object.keys(questionSets);
  const departments = industry ? Object.keys(questionSets[industry] || questionSets.general) : [];
  const questionList = questionSets[industry]?.[department] || questionSets.general?.[department] || [];

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      {!industry ? (
        <>
          <h2>Select your industry</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  textTransform: 'capitalize'
                }}
              >
                {ind.replace('_', ' ')}
              </button>
            ))}
          </div>
        </>
      ) : !department ? (
        <>
          <h2>Select a department to assess</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {departments.map(dep => (
              <button
                key={dep}
                onClick={() => setDepartment(dep)}
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  backgroundColor: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  textTransform: 'capitalize'
                }}
              >
                {dep}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Question {step + 1} of {questionList.length}</h2>
          <p style={{ fontSize: '1.2rem' }}>{questionList[step]}</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            placeholder="Type your answer"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
            autoFocus
          />
          <button
            onClick={handleNext}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#990000',
              color: '#fff',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
