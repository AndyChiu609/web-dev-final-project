import { Message } from "@/lib/types/db"


export const createWriting =async (
  rowContent:string,
  writer?:string
  ) => { 
  // try{
    const newSubmit: Message[] = [
      {
        role: "user",
        content: `Please give some advices in 30 words about the article.\n${rowContent}`,
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

    new Promise( resolve => setTimeout(resolve, 2000) );
    const response = await fetch("/api/writing", {
      method: "POST",
      body: JSON.stringify({
        rowContent:rowContent,
        unemotionalContent: newReview.content,
      })
    })
    const res = await response.json()
    
    return {
      id: res.id,
      rowContent: res.rowContent,
      unemotionalContent: res.unemotionalContent, 
      writer: res.writer,
    }

}

export const updateCardContent = async (
  id:string,
  rowContent:string,
) => {
  const newSubmit: Message[] = [
    {
      role: "user",
      content: `Please give some advices in 30 words about the article.\n${rowContent}`,
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

  fetch("/api/card", {
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