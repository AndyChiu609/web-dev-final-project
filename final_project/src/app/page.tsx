"use client"
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CardList from '../component/cardList';
import { CardItem } from '@/lib/types/db';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default function Home() {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // 新增的狀態


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    // 定义一个默认的图像URL
    const defaultImageUrl = "https://i.pinimg.com/736x/ea/67/5a/ea675abc2ff13891bb691a8aa28c230f.jpg"; // 替换为您的默认图像URL
    // 如果 imageUrl 为空，则使用默认图像URL
    const finalImageUrl = imageUrl || defaultImageUrl;
  
    try {
      const response = await fetch('/api/card', { // 替换为您的 API 端点
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl: finalImageUrl }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // 处理响应数据
      const data = await response.json();
      fetch("/api/writing", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardId: data.id,
        })
      })
      console.log('Response data:', data);
      handleClose(); // 关闭模态框
    } catch (error) {
      console.error('Error:', error);
    }
  
    setRefreshFlag(!refreshFlag);
  };
  

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/card'); // 替換為您的 "get all cards" API 端點
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCards(data.cards); // 假設返回的數據是 { cards: CardItem[] }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [refreshFlag]);

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Hate, Constructive Criticism
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Hate 
          </Typography>
          <TextField
            label="Hate Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="who is this hater?"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
              <TextField
            label="Put a img url here"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          
          
          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '10px' }}>
              Create
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <CardList items={cards} />
    </div>
  );
}