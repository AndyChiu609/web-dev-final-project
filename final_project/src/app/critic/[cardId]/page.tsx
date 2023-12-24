'use client';

import React from 'react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextInput from './_component/TextInput';
import { useCard } from '@/hooks/useCard';


function CriticPage() {
  const {cardItemId, cardItem} = useCard()
  if(!cardItem){
    // alert("Page not found")
    // redirect('/')
    return <></>;
  }
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {cardItem.title}
      </Typography>
      <Typography variant="body1">
        {cardItem.description}
      </Typography>
      <Link href="/" legacyBehavior>
      <button className="m-t-4 bgblue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Home
      </button>
      </Link>

      <div>
        <TextInput />
      </div>
    </div>
  );
};

export default CriticPage;
