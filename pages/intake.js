import { useState } from 'react';
import { useRouter } from 'next/router';

const questionSets = {
  "real_estate": {
    "sales": [
      "Are lead inquiries followed up within 24 hours?",
      "Do you track which channels generate the most buyer interest?",
      "Are deals managed in a CRM or via spreadsheets?",
      "How do you handle multiple listing pipelines?",
      "Do you use automation to stay top of mind with prospects?"
    ],
    "operations": [
      "How do you coordinate listings, showings, and open houses?",
      "Are client handoffs between agents and admin smooth?",
      "Is document management manual or systemized?",
      "How do you track transaction timelines and compliance?",
      "Where do you see the most back-and-forth during deals?"
    ],
    "finance": [
      "Do you track commission payouts by agent and transaction?",
      "Is income by listing source tracked and reviewed?",
      "Are vendor payments tied to closing timelines?",
      "Do you reconcile escrow and commission payments regularly?",
      "Is financial performance segmented by office or region?"
    ],
    "hr": [
      "How is agent onboarding currently managed?",
      "Do you track license renewals and continuing education?",
      "Are HR records centralized and secure?",
      "Is recruiting tied to your projected deal volume?",
      "Do you monitor performance and retention metrics?"
    ]
  },
  "construction": {
    "sales": [
      "Do you track bid conversions or awarded contracts in a CRM?",
      "How do you follow up on cold leads or estimate requests?",
      "Is your sales process clearly documented and automated?",
      "Are client handoffs from sales to operations clean?",
      "Do you get visibility into pipeline by project type?"
    ],
    "operations": [
      "How are field teams scheduled and tracked?",
      "Are work orders and job progress digital or paper-based?",
      "Do you track rework rates or change orders systematically?",
      "How do you coordinate material ordering and deliveries?",
      "Where do most delays in job execution occur?"
    ],
    "finance": [
      "Is job costing accurate and timely?",
      "How do you track actuals vs. estimated costs?",
      "Are invoices and payments tied to project milestones?",
      "Are budget overruns flagged early?",
      "Is labor tracked and billed automatically?"
    ],
    "hr": [
      "How do you handle safety and OSHA compliance training?",
      "Do you track labor certification and union agreements?",
      "Is HR centralized across job sites?",
      "Where do new hire delays typically occur?",
      "How is crew productivity monitored by HR?"
    ]
  },
  "transportation": {
    "sales": [
      "Do you track win rates for delivery contracts or RFPs?",
      "Are prospect follow-ups consistent?",
      "Do you segment sales by fleet or service type?",
      "Is your CRM synced with contract management?",
      "Where is revenue lost during quoting or onboarding?"
    ],
    "operations": [
      "Are delivery schedules managed and updated in real-time?",
      "Do dispatch and fleet teams use integrated tools or spreadsheets?",
      "How is fuel usage, vehicle maintenance, and downtime tracked?",
      "Are driver logs, safety checks, and compliance digital or manual?",
      "Where do delays most often occur in your logistics pipeline?"
    ],
    "finance": [
      "How do you track revenue per route or contract?",
      "Are vehicle costs and maintenance tracked per asset?",
      "Is invoicing tied to route completion or delivery metrics?",
      "Where are collections delayed in your AR process?",
      "How are margins calculated across your delivery network?"
    ],
    "hr": [
      "Is driver hiring and credentialing tracked automatically?",
      "How do you manage shift scheduling across routes?",
      "Is payroll linked to route completion?",
      "Do you track driver turnover or satisfaction?",
      "How is compliance with DOT/FTA logged and verified?"
    ]
  },
  "retail": {
    "sales": [
      "Are you tracking conversion rates per location or channel?",
      "Is your POS integrated with CRM or loyalty platforms?",
      "Where are in-store vs online sales dropping off?",
      "Do you use AI or automation for retargeting?",
      "Are salespeople trained to upsell effectively?"
    ],
    "operations": [
      "How is inventory tracked between storefronts and eCommerce?",
      "Are restocks automated or triggered manually?",
      "Do you track shrinkage or overstock issues?",
      "Is POS data integrated with your CRM and inventory?",
      "What\u2019s the most frequent operational bottleneck?"
    ],
    "marketing": [
      "Are campaign results tracked across all channels?",
      "Do you personalize promotions by segment or behavior?",
      "Is email or SMS marketing automated or manually managed?",
      "Where do you see the most content bottlenecks?",
      "What marketing tool is most underutilized?"
    ],
    "finance": [
      "Do you track margin by product category or location?",
      "Is revenue forecasting tied to inventory and marketing?",
      "How quickly are returns and refunds reconciled?",
      "Are vendor payments automated or tracked manually?",
      "Do you track loss from discounting or stock write-offs?"
    ],
    "hr": [
      "How is employee scheduling managed across locations?",
      "Do you track part-time vs full-time turnover?",
      "Is onboarding for seasonal workers efficient?",
      "How do you monitor customer service quality by employee?",
      "Are HR policies updated and accessible for store staff?"
    ]
  },
  "insurance": {
    "sales": [
      "Are leads coming from referrals, lists, or digital campaigns?",
      "Is follow-up structured by product type or life event?",
      "How do you track quotes and conversion stages?",
      "Is appointment setting automated or manual?",
      "Are policy cross-sell opportunities proactively flagged?"
    ],
    "operations": [
      "How are claims or client documents managed and tracked?",
      "Are underwriting tasks digital or paper-based?",
      "How often do clients complain about communication delays?",
      "Do you track renewal opportunities and lapses effectively?",
      "What systems are most often duplicated?"
    ],
    "finance": [
      "How do you track commissions by policy type?",
      "Are AR balances linked to carrier settlements?",
      "Is profitability segmented by broker or team?",
      "Do you reconcile incentive payouts efficiently?",
      "Where are billing delays or errors occurring?"
    ],
    "hr": [
      "Do you onboard and license agents efficiently?",
      "Are compliance trainings and CE tracked in a system?",
      "How is performance monitored across producers?",
      "Do you track agent attrition or inactive licenses?",
      "Where do support staff feel overloaded?"
    ]
  },
  "manufacturing": {
    "sales": [
      "Do you track quoting accuracy and win rates by product line?",
      "Is CRM linked to production planning?",
      "How do you forecast demand by customer or segment?",
      "Where does quoting or proposal prep get delayed?",
      "Is post-sale coordination consistent?"
    ],
    "operations": [
      "Are production schedules optimized or manually adjusted?",
      "How do you track equipment downtime and maintenance?",
      "Are inventory inputs tied to production usage?",
      "Do quality issues surface early or late in the process?",
      "How do you measure throughput vs. labor cost?"
    ],
    "finance": [
      "Is waste tracked and costed accurately?",
      "Do you report by product line or manufacturing cell?",
      "Are raw materials priced and allocated consistently?",
      "How are margins analyzed over time?",
      "Do you reconcile production volume with revenue forecasts?"
    ],
    "hr": [
      "How is compliance training and OSHA tracking handled?",
      "Are shift schedules balanced and integrated with payroll?",
      "Is onboarding standardized across locations?",
      "Where do you lose the most time onboarding new hires?",
      "Do you track turnover and absenteeism trends?"
    ]
  },
  "dod_contractor": {
    "sales": [
      "How do you track pipeline by NAICS code or vehicle?",
      "Is proposal follow-up automated?",
      "Are teaming and subcontractor contacts centralized?",
      "Do you track award probability across contracts?",
      "Where are delays in capture process occurring?"
    ],
    "operations": [
      "Are compliance tasks like CMMC or NIST tracked in a system?",
      "Is your documentation versioned and auditable?",
      "Do you manage project handoffs securely and consistently?",
      "Are contract deliverables tracked by a centralized PMO?",
      "Where is the most rework or redundancy today?"
    ],
    "finance": [
      "Do you have clear audit trails for cost tracking?",
      "Are indirect costs calculated correctly across contracts?",
      "Is your invoicing DCAA-compliant?",
      "Where are cost overruns or delays creating billing issues?",
      "Do you forecast funding and burn rate in real time?"
    ],
    "hr": [
      "Are clearance levels and badge access tracked centrally?",
      "Is onboarding tied to compliance and project needs?",
      "Do you log training and mission-readiness milestones?",
      "Where is hiring misaligned with contract start dates?",
      "How do you track long-term readiness and turnover?"
    ],
    "cmmc_compliance": [
      "What are you doing now for CMMC Compliance?",
      "Have you completed a self-assessment or third-party audit?",
      "Which CMMC level are you targeting, and by when?",
      "How are you currently tracking NIST 800-171 control implementation?",
      "Who is responsible for cybersecurity compliance in your organization?",
      "Are you aware of the documentation and evidence required for certification?",
      "What\u2019s your biggest concern about achieving compliance?"
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
  const industries = Object.keys(questionSets);
  const departments = industry ? Object.keys(questionSets[industry] || {}) : [];
  const questionList = questionSets[industry]?.[department] || [];

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

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {!industry ? (
          <>
            <h2 style={{ textAlign: 'center' }}>Select Your Industry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {industries.map((ind) => (
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
                  {ind === 'dod_contractor' ? 'DoD Contractor' : ind.replace('_', ' ')}
                </button>
              ))}
            </div>
          </>
        ) : !department ? (
          <>
            <h2 style={{ textAlign: 'center' }}>Select a Department</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {departments.map((dep) => (
                <button
                  key={dep}
                  onClick={() => setDepartment(dep)}
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
                  {dep.replace('_', ' ')}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center' }}>Question {step + 1} of {questionList.length}</h2>
            <p style={{ fontSize: '1.2rem' }}>{questionList[step]}</p>
            {step + 1 === questionList.length && department === "cmmc_compliance" ? (
              <>
                <textarea
                  rows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    marginTop: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                />
                <button
                  onClick={handleNext}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="Type your answer"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    marginTop: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                  }}
                  autoFocus
                />
                <button
                  onClick={handleNext}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Next
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
