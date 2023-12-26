'use client'

import { useCard } from "@/hooks/useCard";
import TextInput from "./TextInput"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from "react";
import { Message } from "@/lib/types/db";
import TextContent from "./TextContent";

export default function Form() {
  const [onType, setOnType] = useState(false);
  const [content, setContent] = useState("click to type something...");
  const [review, setReview] = useState(null);
  const {cardItemId} = useCard();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues : {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setContent(data.content);
    try{
      setValue('content', '', { shouldValidate: true });
      const newSubmit: Message[] = [
        {
          role: "user",
          content: `Please give some advices about the article.\n${data.content}`,
        },
      ]
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: newSubmit,
        })
      })
      const newReview = await response.json();
      setReview(newReview.content);
      setOnType(false);
      
    } catch(error) {
      alert("fail to post comment")
    }
  }

  return (
    <div onClick={()=>setOnType(true)}>
      {(onType)?( 
      <form onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <TextInput 
          id={cardItemId}
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message"
          />
      <button 
          type="submit" 
          className="
          rounded-full 
          p-2 
          bg-sky-500 
          cursor-pointer 
          hover:bg-sky-600 
          transition
          "
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
        </button>
      </form>
      ):(
        <div>
          <TextContent 
            content={content}
          />
        </div>
        )
        }
      <div>
        Review:<br/>{review}
      </div>
    </div>
  )
}
