
import { useState } from 'react';
import { useRouter } from 'next/router';

import { questionSets } from './intake.full.js'; // You will need to merge this or inline the object for production

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
                  {ind.replace('_', ' ')}
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
                  {dep}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center' }}>Question {step + 1} of {questionList.length}</h2>
            <p style={{ fontSize: '1.2rem' }}>{questionList[step]}</p>
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
      </div>
    </div>
  );
}
