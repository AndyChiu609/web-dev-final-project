import React from 'react'
type TextContentProps = {
    content:string,
}
export default function TextContent({
    content,
}:TextContentProps) {
  return (
    <div>{content}</div>
  )
}
