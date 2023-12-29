'use client'
import { useCard } from "@/hooks/useCard"

export default async function Header() {
    const {cardItem} = useCard();
    return (
    <div className="">
      {cardItem?.title}
    </div>
  )
}
