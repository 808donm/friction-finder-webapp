
import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  "What’s your name and role in the business?",
  "What industry are you in?",
  "Which department feels most inefficient right now?",
  "Are your follow-ups with leads and customers automated?",
  "How many tools does your team use daily?",
  "Where do delays or miscommunications happen most often?",
  "Do you have written SOPs for key workflows?",
  "Is your customer onboarding smooth and predictable?",
  "Do you have visibility into team workload and project status?",
  "Where are you still doing manual data entry?",
  "Do you use a CRM or task management system?",
  "How do you track client deliverables or internal projects?",
  "What part of your business feels like it's leaking time or money?",
  "If you could fix one thing instantly, what would it be?"
];

export default function Intake() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (!input.trim()) return;
    const updated = [...answers, input.trim()];
    setAnswers(updated);
    setInput('');
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      router.push({
        pathname: '/summary',
        query: { data: JSON.stringify(updated) }
      });
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Question {step + 1} of {questions.length}</h2>
      <p style={{ fontSize: '1.2rem' }}>{questions[step]}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        placeholder="Type your answer"
        style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
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
    </div>
  );
}
