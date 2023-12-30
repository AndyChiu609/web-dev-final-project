'use client'

import { useCard } from "@/hooks/useCard";
import TextInput from "./TextInput"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import TextContent from "./TextContent";
import { updateCardContent } from "./action";
import { Card, CardContent, Typography } from "@material-ui/core";
import { AlignCenter } from "lucide-react";

export default function Form() {
  const {cardItemId, writingItem} = useCard();
  const [onType, setOnType] = useState(false);
  const [isFriendly, setIsfriendly] = useState(false);
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
      setOnType(false);
      const newWriting = await updateCardContent(cardItemId, data.content)
      setReview(newWriting?.unemotionalContent);
    } catch(error) {
      alert("fail to post comment")
    }
  }

  return (
    <div 
    onClick={()=>{(review==="")?setOnType(true):setOnType(false)}}
    >
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
          p-2
          m-2 
          rounded-md
          bg-blue-600
          cursor-pointer 
          hover:bg-sky-300 
          transition
          text-white
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
      <div className="flex-col justify-itmes-center">
        <br/>
        <Typography variant="h5" className="m-3">你得到的評論</Typography>
          <Card key={cardItemId} style={{ marginBottom: '8px', alignItems:'center' }} className="w-full md:w-3/4">
            <CardContent className="bg-secondary flex text-text">
              <Typography variant="body1">
              {review}
              </Typography>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
