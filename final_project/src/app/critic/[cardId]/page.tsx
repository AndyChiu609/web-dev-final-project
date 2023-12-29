'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, Box } from '@material-ui/core';
import { useCard } from '@/hooks/useCard';
import Form from './_component/Form';
import { CommentItem } from '@/lib/types/db';

function CriticPage() {
  const { cardItem, cardItemId } = useCard();
  const [comments, setComments] = useState<CommentItem[]>();

  useEffect(() => {
    // 在這裡模擬從後端獲取評論的行為
    const fetchCard =async () => {
      const res = await fetch(`/api/comments/${cardItemId}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setComments(data.comment);
    };
    fetchCard();
  }, [cardItem, cardItemId]);

  if (!cardItem) {
    return <></>;
  }

  return (
    <Box style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {cardItem.title}
      </Typography>
      <Typography variant="body1">
        {cardItem.description}
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" style={{ marginTop: '16px', backgroundColor: '#3f51b5', color: 'white' }}>
          Back to Home
        </Button>
      </Link>
      <Form />

      <Box style={{ marginTop: '16px' }}>
        <Typography variant="h5">評論</Typography>
        {(!comments)?(
          <></>
        ):(
          <>
            {comments.map((comment, index) => (
            <Card key={index} style={{ marginBottom: '8px' }}>
              <CardContent>
                <Typography variant="body1">{comment.content}</Typography>
              </CardContent>
            </Card>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CriticPage;
