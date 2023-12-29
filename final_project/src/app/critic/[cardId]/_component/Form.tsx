'use client'

import { useCard } from "@/hooks/useCard";
import TextInput from "./TextInput"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import TextContent from "./TextContent";
import { updateCardContent } from "./action";

export default function Form() {
  const {cardItemId, writingItem} = useCard();
  const [onType, setOnType] = useState(false);
  const [content, setContent] = useState(writingItem?.rowContent);
  const [review, setReview] = useState(writingItem?.unemotionalContent);
  useEffect(()=> {
    setContent(writingItem?.rowContent),
    setReview(writingItem?.unemotionalContent)
    console.log(writingItem);
  }, [writingItem])
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
    setValue('content', '', { shouldValidate: true });
    setContent(data.content);
    try{ 
      const newWriting = await updateCardContent(cardItemId, data.content)
      setReview(newWriting?.unemotionalContent);
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
            content={(content)?content:"Click to Type Something"}
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
