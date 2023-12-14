"use client"
import Typography from '@material-ui/core/Typography';
import CardList from '../component/cardList';

const data = [
  {
    title: "派大星博士加先生",
    description: "你說誰尖頭",
    imageUrl: "/1280.jpeg",
  },
  {
    title: "珊迪·頰先生",
    description: "從海底來的空手道高手",
    imageUrl: "/1280.jpeg",
  },
  {
    title: "蟹老闆先生",
    description: "蟹堡的創始人與老闆",
    imageUrl: "/1280.jpeg",
  },
  {
    title: "章魚哥",
    description: "悲觀的音樂家與美食家",
    imageUrl: "/1280.jpeg",
  },
  {
    title: "珍珠小姐",
    description: "愛心豐富的海底啦啦隊長",
    imageUrl: "/1280.jpeg",
  },
  {
    title: "葛瑞先生",
    description: "海底松鼠科學家的寵物",
    imageUrl: "/1280.jpeg",
  },
];


export default function Home() {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Hate, Constructive Criticism
      </Typography>
      <CardList items={data} />
    </div>
  );
}