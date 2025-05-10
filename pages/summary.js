
import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : [];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Executive Summary</h2>
      <p>Based on your answers, we’ve identified the following friction points:</p>
      <ul>
        {data.map((answer, idx) => (
          <li key={idx}>{answer}</li>
        ))}
      </ul>
      <a href="https://strategy.cybersecurehawaii.com" target="_blank">
        <button style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}>
          Book a First Time Appointment
        </button>
      </a>
    </div>
  );
}
