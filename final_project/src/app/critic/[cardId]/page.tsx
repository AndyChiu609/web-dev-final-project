'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, Box, TextField } from '@material-ui/core';
import { useCard } from '@/hooks/useCard';
import Form from './_component/Form';
import { CommentItem } from '@/lib/types/db';
import Header from './_component/Header';

function CriticPage() {
  const { cardItem, cardItemId } = useCard();
  const [comments, setComments] = useState<CommentItem[]>();
  const [newComment, setNewComment] = useState('');


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = async () => {
    console.log('Submitted comment:', newComment);
  
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          cardId: cardItemId, // 假設 cardItemId 是當前卡片的ID
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      // 更新本地評論列表
      setComments((prevComments) => [...(prevComments ?? []), data]);
      setNewComment(''); // 清空輸入框
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  

  useEffect(() => {
    // 從後端獲取評論的函數
    const fetchComments = async () => {
      console.log(`Fetching comments for card ID: ${cardItemId}`); // 日誌 1
  
      try {
        const response = await fetch(`/api/comments/${cardItemId}`);
        console.log('Response received:', response); // 日誌 2
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Response data:', data); // 日誌 3
  
        setComments(data.comments); // 假設返回的數據結構中包含一個名為 comments 的字段
      } catch (error) {
        console.error('Error fetching comments:', error); // 日誌 4
      }
    };
  
    if (cardItemId) {
      fetchComments();
    } else {
      console.log('Card ID is not available.'); // 日誌 5
    }
  }, [cardItemId]);


  if (!cardItem) {
    return <></>;
  }

  return (
    <Box style={{ padding: '20px' }}>
      <Header />
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
                {/* 新增評論輸入區 */}
                <Box style={{ marginTop: '16px' }}>
                <Box style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                  <TextField
                    fullWidth
                    label="新增評論"
                    variant="outlined"
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{ marginRight: '8px' }} // 為了在輸入框和按鈕之間添加間距
                  />
                  <Button variant="contained" color="primary" onClick={submitComment}>
                    確認輸入
                  </Button>
                </Box>
        </Box>
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
