import { useState } from 'react';
import { useRouter } from 'next/router';

const departmentQuestions = {
  finance: [
    "Are your financial reports generated automatically or manually?",
    "Do you spend more time gathering data or analyzing it?",
    "Is forecasting and budgeting consistent across teams?",
    "How do you track outstanding invoices and collections?",
    "Is your payroll or expense processing mostly automated?",
    "Are financial systems integrated with operations or siloed?",
    "Where do you feel time is most wasted in financial reporting?",
    "Are approvals (expenses, budgets, purchases) efficient?",
    "Do you reconcile data between systems manually?",
    "What’s one financial process that needs serious streamlining?"
  ],
  hr: [
    "Is your new employee onboarding mostly manual or automated?",
    "How do you track training, certifications, or compliance?",
    "Do employees access HR systems easily or need assistance?",
    "Are performance evaluations digitized or paper-based?",
    "Where do most HR delays or bottlenecks occur?",
    "Is employee data stored in one system or across tools?",
    "Are PTO requests, payroll, and benefits fully integrated?",
    "Is recruiting and candidate tracking streamlined?",
    "How long does it take to onboard a new hire?",
    "What’s the most repetitive task your HR team handles?"
  ],
  operations: [
    "Are your processes documented in SOPs or passed down verbally?",
    "Which task or department causes the most frequent delays?",
    "Do teams use standardized tools or a mix of platforms?",
    "Are issues escalated and resolved in a timely manner?",
    "Where is manual re-entry or double work happening?",
    "Is project status easily visible at all times?",
    "Are handoffs between teams smooth or friction-filled?",
    "Do you rely on spreadsheets for core operations?",
    "How often are you firefighting instead of optimizing?",
    "Where is wasted time or motion most obvious in your workflow?"
  ],
  administration: [
    "How many systems do you use for day-to-day admin work?",
    "Are scheduling, reminders, and follow-ups automated?",
    "Do you ever lose track of requests or tasks?",
    "How is document management handled across departments?",
    "Are your intake and routing processes manual?",
    "Are recurring reports created with templates or from scratch?",
    "How long does it take to process a typical request?",
    "Do you repeat similar communications frequently?",
    "Are notifications and escalations handled automatically?",
    "Where do you feel administrative time is being wasted?"
  ],
  sales: [
    "How often do leads slip through the cracks?",
    "Is follow-up timing automated or based on memory?",
    "Are you tracking deals in a CRM or via spreadsheets?",
    "Can you easily view pipeline health and close probabilities?",
    "How many hours a week are spent logging activity?",
    "Are proposals and contracts generated manually?",
    "Where is the sales cycle being delayed unnecessarily?",
    "Do you have automation to re-engage cold leads?",
    "How easy is it to identify your best lead sources?",
    "What’s the most frustrating part of your sales workflow?"
  ],
  marketing: [
    "Are you using multiple tools to track campaigns and results?",
    "Is content creation a bottleneck in your marketing flow?",
    "Do you have visibility into ROI across all channels?",
    "Are email, ad, and social campaigns coordinated or fragmented?",
    "Are client/prospect lists updated manually?",
    "Is lead handoff to sales consistent and documented?",
    "Where do you feel you're duplicating effort across campaigns?",
    "Are marketing reports generated manually or scheduled?",
    "Are you spending more time managing tools or executing strategy?",
    "What marketing task do you wish you never had to do again?"
  ]
};

export default function Intake() {
  const router = useRouter();
  const [department, setDepartment] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');

  const handleDepartmentSelect = (dept) => {
    setDepartment(dept);
  };

  const handleNext = () => {
    if (!input.trim()) return;

    const updatedAnswers = [...answers, input.trim()];
    setAnswers(updatedAnswers);
    setInput('');

    if (step + 1 < departmentQuestions[department].length) {
      setStep(step + 1);
    } else {
      router.push({
        pathname: '/summary',
        query: {
          data: JSON.stringify(updatedAnswers),
          department
        }
      });
    }
  };

  const questionList = department ? departmentQuestions[department] : [];

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      {!department ? (
        <>
          <h2>Which department would you like to assess?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {Object.keys(departmentQuestions).map((dept) => (
              <button
                key={dept}
                onClick={() => handleDepartmentSelect(dept)}
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {dept}
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
