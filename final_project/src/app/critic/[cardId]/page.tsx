'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, Box, TextField } from '@material-ui/core';
import { useCard } from '@/hooks/useCard';
import Form from './_component/Form';
import { CommentItem } from '@/lib/types/db';
import Header from './_component/Header';

function CriticPage() {
  const [refreshComments, setRefreshComments] = useState(false);
  const { cardItem, cardItemId } = useCard();
  const [comments, setComments] = useState<CommentItem[]>();
  const [newComment, setNewComment] = useState('');


  const handleCommentChange = (event:any) => {
    setNewComment(event.target.value);
  };

  const handleKeyPress = (event:any) => {
    // 检查是否按下了 Enter 键
    if (event.key === 'Enter') {
      submitComment();
    }
  };

  const submitComment = async () => {
    console.log('Submitted comment:', newComment);
  
    // 从 localStorage 获取用户名，如果没有则默认为 "anonymous"
    const username = localStorage.getItem('identity') || 'anonymous';
  
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // 添加用户名字段
          content: newComment,
          cardId: cardItemId, // 假设 cardItemId 是当前卡片的ID
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      // 更新本地评论列表
      setComments((prevComments) => [...(prevComments ?? []), data]);
      setNewComment(''); // 清空输入框
      setRefreshComments(!refreshComments);
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

        data.comments.forEach(comment => {
          console.log(`Timestamp for comment ${comment.id}:`, comment.timestamp);
        });
  
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
  }, [cardItemId,refreshComments]);


  if (!cardItem) {
    return <></>;
  }

  return (
    <Box style={{ padding: '20px' }}>
      <Header />
      <Form />

      <Box style={{ marginTop: '16px' }}>
        <Typography variant="h5">評論</Typography>
                {/* 新增評論輸入區 */}
                <Box style={{ marginTop: '16px' }}>
                <Box style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                  <TextField
                    fullWidth
                    label="點擊輸入按鈕或是按下 Enter 鍵來送出評論"
                    variant="outlined"
                    value={newComment}
                    onChange={handleCommentChange}
                    onKeyPress={handleKeyPress} // 添加事件处理函数
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
              <Typography variant="body1">留言: {comment.content}</Typography>
              {/* 以下假设comment对象中包含timestamp和username字段 */}
              <Typography variant="body2">
                時間: {new Date(comment.timestamp).toLocaleString('zh-TW')}
              </Typography>

              <Typography variant="body2">by: {comment.username}</Typography>
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
