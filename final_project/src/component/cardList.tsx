import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
      display: 'flex', // 啟用 Flexbox
      flexWrap: 'wrap', // 當一行滿時換行
      justifyContent: 'space-around', // 平均分布卡片的水平空間
      alignItems: 'flex-start', // 從容器頂部開始對齊卡片
      gap: '20px', // 卡片之間的間隙
    }}>
      {items.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
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
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default CardList;
