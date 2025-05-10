
// intake-expanded.js
// Includes HR and Sales added across all defined industries

const questionSets = {
  general: {
    sales: ['Are inbound leads consistently entered into a CRM?', 'Is follow-up timing consistent across sales reps?', 'Where does most deal loss typically occur in the sales process?', 'Do you use automation for nurturing cold or unresponsive leads?', 'Is sales forecasting tied to real-time pipeline data?'],
    hr: ['How is new hire onboarding currently tracked and managed?', 'Is employee compliance training automated or manually managed?', 'Do you monitor turnover or retention trends within HR?', 'How often do you run performance reviews and how are they recorded?', 'Are your employee files securely centralized and auditable?']
  },
  real_estate: {
    sales: [
      "Are lead inquiries followed up within 24 hours?",
      "Do you track which channels generate the most buyer interest?",
      "Are deals managed in a CRM or via spreadsheets?",
      "How do you handle multiple listing pipelines?",
      "Do you use automation to stay top of mind with prospects?"
    ],
    hr: ['How is new hire onboarding currently tracked and managed?', 'Is employee compliance training automated or manually managed?', 'Do you monitor turnover or retention trends within HR?', 'How often do you run performance reviews and how are they recorded?', 'Are your employee files securely centralized and auditable?']
  },
  manufacturing: {
    operations: [
      "Are production schedules optimized or manually adjusted?",
      "How do you track equipment downtime and maintenance?",
      "Are inventory inputs tied to production usage?",
      "Do quality issues surface early or late in the process?",
      "How do you measure throughput vs. labor cost?"
    ],
    finance: [
      "Is waste tracked and costed accurately?",
      "Do you report by product line or manufacturing cell?",
      "Are raw materials priced and allocated consistently?",
      "How are margins analyzed over time?",
      "Do you reconcile production volume with revenue forecasts?"
    ],
    hr: ['How is new hire onboarding currently tracked and managed?', 'Is employee compliance training automated or manually managed?', 'Do you monitor turnover or retention trends within HR?', 'How often do you run performance reviews and how are they recorded?', 'Are your employee files securely centralized and auditable?'],
    sales: ['Are inbound leads consistently entered into a CRM?', 'Is follow-up timing consistent across sales reps?', 'Where does most deal loss typically occur in the sales process?', 'Do you use automation for nurturing cold or unresponsive leads?', 'Is sales forecasting tied to real-time pipeline data?']
  }
};
