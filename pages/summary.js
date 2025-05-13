
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

  const sendSummaryToGHL = async (contactInfo, summaryText) => {
  const payload = {
    first_name: contactInfo.firstName,
    email: contactInfo.email,
    phone: contactInfo.phone || '',
    company: contactInfo.company || '',
    position: contactInfo.position || '',
    friction_summary: summaryText
  };

  try {
    const response = await fetch("https://services.leadconnectorhq.com/hooks/rR6d81fxHIbgMJ3x0czh/webhook-trigger/c75e2946-2ef5-43f6-a2c6-04a924c963cb", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('📬 GHL Webhook Response:', result);
  } catch (error) {
    console.error('❌ Error sending summary to GHL:', error);
  }
};


  const generatePDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();

    const wrapText = (text, x, y, maxWidth, lineHeight) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line, i) => {
        doc.text(line, x, y + i * lineHeight);
      });
      return y + lines.length * lineHeight;
    };

    const contactInfo = {
  firstName: "John", // You should pull this from the intake form or URL params
  email: "john@example.com",
  phone: "", // Optional
  company: "", // Optional
  position: "" // Optional
};

const combinedSummary = `Industry: ${formattedIndustry}
Department: ${formattedDepartment}
Friction Insight: ${summary.join(' ')}
Answers: ${answers.join('; ')}`;

sendSummaryToGHL(contactInfo, combinedSummary);

    // Branding: logo and slogan
    const img = new Image();
    img.src = '/Logo (1) Huntress.png'; // Ensure logo is hosted at /public
    img.onload = () => {
      doc.addImage(img, 'PNG', 20, 10, 30, 30); // logo at top left
      doc.setFontSize(14);
      doc.text("Where Vision Meets Execution", 60, 25); // slogan aligned with logo
      proceed();
    };

    const proceed = () => {
      let y = 50;
      doc.setFontSize(12);
      doc.text(`Industry: ${formattedIndustry}`, 20, y);
      doc.text(`Department: ${formattedDepartment}`, 20, y + 8);

      y += 20;
      doc.setFontSize(14);
      doc.text("Friction Summary:", 20, y);
      y += 10;
      summary.forEach(line => {
        y = wrapText(line, 20, y, 170, 7);
      });

      y += 10;
      doc.setFontSize(14);
      doc.text("Your Answers:", 20, y);
      y += 10;
      answers.forEach((a, i) => {
        const answerText = `Q${i + 1}: ${a}`;
        y = wrapText(answerText, 20, y, 170, 7);
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      y += 10;
      doc.setFontSize(12);
      doc.setTextColor(0, 102, 204);
      wrapText("Want help resolving these friction points? Book your AI Strategy Session at https://strategy.cybersecurehawaii.com", 20, y, 170, 7);

      doc.save("friction_finder_summary.pdf");
    };
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
