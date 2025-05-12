
import { useRouter } from 'next/router';

export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];
  const industry = router.query.industry || '';
  const department = router.query.department || '';

  const formattedIndustry = industry === 'dod_contractor' ? 'DoD Contractor' : industry.replace('_', ' ');
  const formattedDepartment = department.replace('_', ' ');

  const frictionByContext = {
    hr: "Manual onboarding, training gaps, or scattered employee records may expose the business to compliance and productivity risks.",
    sales: "Missed follow-ups, pipeline blind spots, or inconsistent CRM usage may be reducing revenue opportunities.",
    operations: "Redundant manual processes, rework, and bottlenecks may be increasing overhead or slowing down delivery.",
    finance: "Delayed reconciliation, unclear margin visibility, or fragmented tools may be impacting financial decision-making.",
    marketing: "Campaign ROI may be unclear or delayed due to disconnected platforms and lack of attribution.",
    cmmc_compliance: "Unclear or incomplete CMMC preparation may delay contracts or create audit risk. You're wise to assess this now."
  };

  const summary = [];

  if (frictionByContext[department]) {
    summary.push(frictionByContext[department]);
  }

  if (summary.length === 0) {
    summary.push("No clear friction detected — but most businesses have inefficiencies hidden in plain sight.");
  }

  const generatePDF = () => {
    const jsPDF = (await import('jspdf')).default;
    const generatePDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Friction Finder Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Industry: ${formattedIndustry}`, 20, 30);
    doc.text(`Department: ${formattedDepartment}`, 20, 38);

    doc.setFontSize(14);
    doc.text("Friction Summary:", 20, 50);
    let y = 60;
    summary.forEach((line) => {
      doc.setFontSize(12);
      doc.text(`- ${line}`, 20, y);
      y += 8;
    });

    doc.setFontSize(14);
    doc.text("Your Answers:", 20, y + 10);
    y += 18;
    answers.forEach((answer, i) => {
      doc.setFontSize(12);
      const questionLabel = `Q${i + 1}:`;
      doc.text(`${questionLabel} ${answer}`, 20, y);
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("friction_finder_summary.pdf");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Friction Summary</h2>
      <p><strong>Industry:</strong> {formattedIndustry}</p>
      <p><strong>Department:</strong> {formattedDepartment}</p>
      <ul>
        {summary.map((item, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>{item}</li>
        ))}
      </ul>
      <h3>Your Answers</h3>
      <ul>
        {answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      <button
        onClick={generatePDF}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.25rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
