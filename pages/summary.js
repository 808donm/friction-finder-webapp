import { useRouter } from 'next/router';


export default function Summary() {
  const router = useRouter();
  const answers = router.query.data ? JSON.parse(router.query.data) : [];
  const industry = router.query.industry || '';
  const department = router.query.department || '';

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Summary</h2>
      <p><strong>Industry:</strong> {industry}</p>
      <p><strong>Department:</strong> {department}</p>
      <ul>
        {answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
