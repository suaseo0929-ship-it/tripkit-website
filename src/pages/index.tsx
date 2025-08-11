import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}>
      <h1>TripKit</h1>
      <p>여행 성향 테스트로 이동:</p>
      <p>
        <Link href="/TravelTestPage">Travel Test Page</Link>
      </p>
    </div>
  );
}


