import React from 'react'
type TextContentProps = {
    content:string,
}
export default function TextContent({
    content,
}:TextContentProps) {
  return (
    <div className="
    text-black
    font-light
    rounded-md
    mt-4 md:mt-8
    py-2
    px-4
    bg-neutral-100 
    w-full md:w-3/4
    focus:outline-none
    "
    >{content}</div>
  )
}
