
export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to the Friction Finder</h1>
      <p>Click below to begin diagnosing inefficiencies in your business.</p>
      <a href="/intake">
        <button style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>
          Start Diagnostic
        </button>
      </a>
    </div>
  );
}
