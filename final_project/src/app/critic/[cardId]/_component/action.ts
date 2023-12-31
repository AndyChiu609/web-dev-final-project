import { Message } from "@/lib/types/db"

export const updateCardContent = async (
  id:string,
  rowContent:string,
) => {
  const newSubmit: Message[] = [
    {
      role: "user",
      content: `Please give some gentle advices in 50 words about the article and reply with the same language as following text.\n${rowContent}`,
    },
  ]
// fetch the response from openAI
  const airesponse = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      messages: newSubmit,
    })
  })
  const newReview = await airesponse.json();

  fetch("/api/writing", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      rowContent:rowContent,
      unemotionalContent: newReview.content,
    })
  })
  // const res = await response.json()
  
  return {
    rowContent: rowContent,
    unemotionalContent: newReview.content, 
  }
}