"use client"


import { useRouter } from 'next/router';

const CriticPage = () => {
  const router = useRouter();

  // Ensure the router is ready before trying to access query parameters
  const id = router.isReady ? router.query.id : null;

  // Check if 'id' is a string and cast it to string type if it is not null or undefined
  const title = typeof id === 'string' ? id : '';

  // Placeholder content
  const content = {
    title: title,
    description: "This is a placeholder description."
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      {/* Other content */}
    </div>
  );
};

export default CriticPage;
