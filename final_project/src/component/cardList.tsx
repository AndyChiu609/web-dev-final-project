import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Button, CardActionArea, CardActions } from '@mui/material';

// 定義卡片數據的接口
interface CardItem {
  title: string;
  description: string;
  imageUrl: string;
}

// 定義 CardList 組件的 props 類型
interface CardListProps {
  items: CardItem[];
}

const CardList: React.FC<CardListProps> = ({ items }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '20px'
    }}>
      {items.map((item, index) => (
        <Link key={index} href={`/critic/${item.title}`} passHref>
          <Card sx={{ 
            flex: '1 0 21%',
            maxWidth: '345px',
            margin: '10px'
          }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default CardList;
