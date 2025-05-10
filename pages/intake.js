
import { useState } from 'react';
import { useRouter } from 'next/router';

const questionSets = {
  general: {
    sales: [
      "How often do leads slip through the cracks?",
      "Is follow-up timing automated or based on memory?",
      "Are you tracking deals in a CRM or via spreadsheets?",
      "Where is the sales cycle being delayed unnecessarily?",
      "Do you have automation to re-engage cold leads?",
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
  construction: {
    sales: [
      "Do you track bid conversions or awarded contracts in a CRM?",
      "How do you follow up on cold leads or estimate requests?",
      "Is your sales process clearly documented and automated?",
      "Are client handoffs from sales to operations clean?",
      "Do you get visibility into pipeline by project type?"
    ],
    operations: [
      "How are field teams scheduled and tracked?",
      "Are work orders and job progress digital or paper-based?",
      "Do you track rework rates or change orders systematically?",
      "How do you coordinate material ordering and deliveries?",
      "Where do most delays in job execution occur?"
    ],
    finance: [
      "Is job costing accurate and timely?",
      "How do you track actuals vs. estimated costs?",
      "Are invoices and payments tied to project milestones?",
      "Are budget overruns flagged early?",
      "Is labor tracked and billed automatically?"
    ]
  },
  healthcare: {
    operations: [
      "How is patient intake and scheduling handled?",
      "Are charts or records managed digitally and securely?",
      "Do you use manual processes for billing and insurance?",
      "Is HIPAA compliance documented and enforced?",
      "Are communication tools integrated across departments?"
    ],
    hr: [
      "Is credentialing and license renewal automated?",
      "Are compliance trainings tracked consistently?",
      "Do you have onboarding for clinical and admin staff?",
      "Are shift schedules optimized to reduce overtime?",
      "Is payroll integrated with scheduling?"
    ],
    finance: [
      "Are insurance claims processed manually?",
      "How do you reconcile EOBs with billing?",
      "Are revenue cycles delayed by data issues?",
      "Do you track payer mix and collection rates?",
      "Is financial reporting built for healthcare KPIs?"
    ]
  },
  finance: {
    sales: [
      "How are new client leads captured and tracked?",
      "Do you have automated onboarding for investors or clients?",
      "Are follow-ups based on client life stages or products?",
      "Do you generate proposals and performance summaries manually?",
      "How are referrals or retention tracked?"
    ],
    operations: [
      "Are client records centralized and compliant?",
      "Do teams use shared dashboards or siloed files?",
      "How do you track onboarding progress and deliverables?",
      "Are financial plans reviewed collaboratively?",
      "Where is time most often wasted between advisors and staff?"
    ],
    finance: [
      "How is revenue per advisor or product line tracked?",
      "Are payouts, splits, or commissions automated?",
      "Do you track cost-to-serve per client?",
      "Are compliance or audit trails built into reporting?",
      "Are expenses and financial goals reviewed regularly?"
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
