import { CardItem, WritingItem } from "@/lib/types/db";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const useCard = () => {
  const {cardId} = useParams()
  const cardItemId = Array.isArray(cardId) ? cardId[0]: cardId;
  const [writingItem, setWrtingItem] = useState<WritingItem|null>(null);
  const [cardItem, setCardItem] = useState<CardItem|null>(null);
  const router = useRouter();

  useEffect(() => {
    if(!cardItemId) return;
    const fetchCard =async () => {
      const res = await fetch(`/api/card/${cardItemId}`);
      if (!res.ok) {
        setCardItem(null);
        router.push("/")
        return;
      }
      const data = await res.json();
      setCardItem(data);
    };

    const fetchWriting = async() => {
      const res = await fetch(`/api/writing/${cardItemId}`);
      if (!res.ok) {
        setWrtingItem(null);
        router.push("/")
        return;
      }
      const data = await res.json();
      setWrtingItem(data);
    }

    fetchCard();
    fetchWriting();
  }, [cardItemId, router]);

  return {
    cardItemId,
    cardItem,
    writingItem,
  }
}