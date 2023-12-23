'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const CriticPage = () => {
  const pathname = usePathname();

  // Log the pathname to see what's being returned
  console.log('Encoded pathname:', pathname);

  // Decode the pathname to get the actual path
  const decodedPathname = decodeURIComponent(pathname);

  // Log the decoded pathname to verify it's correct
  console.log('Decoded pathname:', decodedPathname);

  // Extract the ID from the decoded pathname
  const id = decodedPathname.split('/')[2]; // Adjust the index based on your routing structure

  // Log the extracted 'id' to see what's being captured
  console.log('Extracted id:', id);

  // Placeholder content for when 'id' is found
  const content = {
    title: `Critic Page: ${id}`,
    description: "This is a placeholder description for the critic page."
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {content.title}
      </Typography>
      <Typography variant="body1">
        {content.description}
      </Typography>
      <Link href="/" legacyBehavior>
      <button className="m-t-4 bgblue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Home
      </button>
      </Link>
    </div>
  );
};

export default CriticPage;
