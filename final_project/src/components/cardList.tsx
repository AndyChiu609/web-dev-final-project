import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';
import { CardItem } from '@/lib/types/db';

interface CardListProps {
  items: CardItem[];
}

const CardList: React.FC<CardListProps> = ({ items }) => {
  // 处理图像加载错误
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/好討厭喔.jpg'; // 使用项目中的默认图像
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '20px'
    }}>
      {items.map((item, index) => (
        <Link key={index} href={`/critic/${item.id}`} passHref>
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
                onError={handleImageError}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by  {item.description}
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