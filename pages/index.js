
export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to the Friction Finder</h1>
      <p>This is your diagnostic launch point.</p>
      <a href="/intake">
        <button style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>
          Start Diagnostic
        </button>
      </a>
    </div>
  );
}
