'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCard } from '@/hooks/useCard';
import Form from './_component/Form';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2.5),
  },
  backButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow']),
  },
  commentSection: {
    marginTop: theme.spacing(2),
  },
  commentCard: {
    marginBottom: theme.spacing(2),
  },
}));

function CriticPage() {
  const classes = useStyles();
  const { cardItem } = useCard();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 在這裡模擬從後端獲取評論的行為
    const mockComments = [
      { content: "這是一個很有見地的文章！", writingId: cardItem?.id },
      { content: "我非常同意作者的觀點。", writingId: cardItem?.id }
    ];
    setComments(mockComments);
  }, [cardItem]);

  if (!cardItem) {
    return <></>;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        {cardItem.title}
      </Typography>
      <Typography variant="body1">
        {cardItem.description}
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" className={classes.backButton}>
          Back to Home
        </Button>
      </Link>
      <Form />

      <Box className={classes.commentSection}>
        <Typography variant="h5">評論</Typography>
        {comments.map((comment, index) => (
          <Card key={index} className={classes.commentCard}>
            <CardContent>
              <Typography variant="body1">{comment.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CriticPage;
