
import { useState } from 'react';
import { useRouter } from 'next/router';

const questionSets = {
  general: {
    sales: [
      "Are inbound leads consistently entered into a CRM?",
      "Is follow-up timing consistent across sales reps?",
      "Where does most deal loss typically occur in the sales process?",
      "Do you use automation for nurturing cold or unresponsive leads?",
      "Is sales forecasting tied to real-time pipeline data?"
    ],
    hr: [
      "How is new hire onboarding currently tracked and managed?",
      "Is employee compliance training automated or manually managed?",
      "Do you monitor turnover or retention trends within HR?",
      "How often do you run performance reviews and how are they recorded?",
      "Are your employee files securely centralized and auditable?"
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
    hr: [
      "Do you track agent onboarding and license renewals in a centralized system?",
      "Are commission plans and compliance documents digital or paper-based?",
      "Is training for new agents standardized and timely?",
      "Where does onboarding typically get delayed?",
      "Do you track agent turnover and satisfaction?"
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
