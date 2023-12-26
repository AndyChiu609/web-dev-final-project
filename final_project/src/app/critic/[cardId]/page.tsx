'use client';

import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { useCard } from '@/hooks/useCard';
import Form from './_component/Form';


function CriticPage() {
  const {cardItem} = useCard()
  if(!cardItem){
    return <></>
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
      <Form />
    </div>
  );
};

export default CriticPage;
