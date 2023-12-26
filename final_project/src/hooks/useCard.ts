import { CardItem } from "@/lib/types/db";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const useCard = () => {
  const {cardId} = useParams()
  const cardItemId = Array.isArray(cardId) ? cardId[0]: cardId;
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
    fetchCard();
  }, [cardItemId, router]);

  return {
    cardItemId,
    cardItem,
  }
}