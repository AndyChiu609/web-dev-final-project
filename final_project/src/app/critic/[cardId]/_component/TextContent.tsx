import { Card } from '@/components/ui/card'
import React from 'react'
type TextContentProps = {
    content:string,
}
export default function TextContent({
    content,
}:TextContentProps) {
  return (
      <div className="flex items-center justify-items-center">
        <Card className="
        text-text
        font-light
        rounded-md
        mt-4 md:mt-8
        py-2
        px-4
        bg-secondary 
        w-full md:w-3/4
        focus:outline-none
        "
        >{content}</Card>

      </div>

  )
}
