
export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to the Friction Finder</h1>
      <p style={{ color: 'white', textAlign: 'center' }}>Click below to begin diagnosing inefficiencies in your business.</p>
      <a href="/intake">
        <button style={{ display: 'block', margin: '1rem auto', padding: '0.75rem 1.5rem' }}>
          Start Diagnostic
        </button>
      </a>
    </div>
  );
}
