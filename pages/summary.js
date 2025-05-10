
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];
  const industry = router.query.industry || 'general';
  const department = router.query.department || 'general';
  const contentRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const downloadPDF = () => {
    if (!window.html2pdf || !contentRef.current) return;
    const options = {
      margin: 0.5,
      filename: 'Friction-Finder-Summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    window.html2pdf().set(options).from(contentRef.current).save();
  };

  const text = answers.join(' ').toLowerCase();

  const frictionByContext = {
    real_estate: {
      sales: "Lead response time, poor CRM usage, and pipeline visibility may be impacting close rates.",
      operations: "Unsystematic handoffs and manual transaction tracking may be slowing deals and increasing risk."
    },
    transportation: {
      operations: "Manual dispatch and lack of fleet tracking integration may be hurting route efficiency and uptime.",
      finance: "Revenue per route and fleet cost tracking may be poorly connected, creating margin blind spots."
    },
    retail: {
      operations: "Inventory misalignment and manual POS-sync may cause stockouts, overstock, or customer dissatisfaction.",
      marketing: "Disjointed tools and untracked campaigns can lead to poor ROI and lost re-engagement opportunities."
    },
    insurance: {
      sales: "Inconsistent follow-up and lack of policy tracking automation may result in missed cross-sell and retention.",
      operations: "Manual document handling, underwriting delays, and compliance lapses may be exposing the business."
    },
    dod: {
      operations: "Project visibility and documentation workflows may not meet compliance or audit trail requirements.",
      finance: "Poor cost segregation and delayed DCAA-aligned billing may risk reimbursement and audit issues."
    },
    manufacturing: {
      operations: "Untracked downtime, inefficient production scheduling, or fragmented inventory systems may reduce output.",
      finance: "Margins may be eroding due to poor waste visibility or raw material cost tracking.",
      hr: "Turnover, absenteeism, and uncoordinated compliance training may be driving hidden labor costs."
    }
  };

  const genericPatterns = {
    operations: ["manual", "rework", "delay", "slow", "repeat", "spreadsheet"],
    revenue: ["follow-up", "leads", "sales", "pipeline", "conversion"],
    tech: ["tools", "systems", "platforms", "disconnected", "fragmented"]
  };

  const friction = [];

  if (frictionByContext[industry]?.[department]) {
    friction.push(frictionByContext[industry][department]);
  }

  if (genericPatterns.operations.some(w => text.includes(w))) {
    friction.push("Operations may be slowed by manual work or redundant tasks.");
  }
  if (genericPatterns.revenue.some(w => text.includes(w))) {
    friction.push("Revenue may be leaking due to inconsistent sales or client follow-up.");
  }
  if (genericPatterns.tech.some(w => text.includes(w))) {
    friction.push("Fragmented systems or disconnected tools may be holding back efficiency.");
  }

  if (friction.length === 0) {
    friction.push("No clear friction detected—yet most businesses have hidden inefficiencies just beneath the surface.");
  }

  return (
    <>
      <div ref={contentRef} style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
        <h2>Executive Summary</h2>
        <p><strong>Industry:</strong> {industry.replace('_', ' ')}</p>
        <p><strong>Department:</strong> {department}</p>
        <p>Based on your responses, the following friction points may be impacting your business:</p>
        <ul>
          {friction.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.75rem' }}>{item}</li>
          ))}
        </ul>
        <p>These issues can limit profitability, increase team burnout, and reduce growth capacity.</p>
        <a href="https://strategy.cybersecurehawaii.com" target="_blank" rel="noopener noreferrer">
          <button style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}>
            Book an AI Strategy Call
          </button>
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Download PDF Summary
        </button>
      </div>
    </>
  );
}
