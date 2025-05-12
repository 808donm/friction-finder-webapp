export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',         // Stack items vertically
        alignItems: 'center',            // Center items horizontally
        justifyContent: 'center',        // Center items vertically (optional)
        minHeight: '100vh',              // Make it full screen
        padding: '2rem',
        fontFamily: 'sans-serif'
      }}
    >
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Welcome to the Friction Finder
      </h1>
      <p style={{ color: 'white', textAlign: 'center' }}>
        Click below to begin diagnosing inefficiencies in your business.
      </p>
      <a href="/intake">
        <button
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Start Diagnostic
        </button>
      </a>
    </div>
  );
}
