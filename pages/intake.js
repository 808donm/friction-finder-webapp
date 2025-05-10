export default function Intake() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Intake Page</h2>
      <p>This is where the diagnostic begins.</p>
    </div>
  );
}
import { useState } from 'react';
import { useRouter } from 'next/router';
import { questions } from '../lib/questions';

export default function Intake() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (!input.trim()) return; // prevent empty answers

    const updatedAnswers = [...answers, input.trim()];
    setAnswers(updatedAnswers);
    setInput('');

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // Done with all questions — redirect to summary
      router.push({
        pathname: '/summary',
        query: { data: JSON.stringify(updatedAnswers) }
      });
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Question {step + 1} of {questions.length}</h2>
      <p style={{ fontSize: '1.2rem' }}>{questions[step].prompt}</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        autoFocus
        placeholder="Type your answer here"
        style={{
          width: '100%',
          padding: '0.75rem',
          marginTop: '1rem',
          fontSize: '1rem',
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
          backgroundColor: '#990000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
}
