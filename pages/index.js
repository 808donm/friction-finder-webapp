// pages/index.js
export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Friction Finder</h1>
      <p>Welcome, Lord of Cybersecurity. Your diagnostic awaits.</p>
      <a href="/intake">
        <button style={{ marginTop: "1rem", padding: "0.75rem 1.5rem" }}>
          Start Diagnostic
        </button>
      </a>
    </div>
  );
}