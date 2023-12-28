import { db } from "@/db";
import { writingsTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTWritingsTableSchema = z.object({
  rowContent: z.string().min(1).max(300).optional(),
  unemotionalContent: z.string().min(1).max(300).optional(),
  writer: z.string().optional(),
  cardId: z.string(),
})
type POSTWritingsRequest = z.infer<typeof POSTWritingsTableSchema>;

export async function POST(
  req:NextRequest,
) {
  const data = await req.json();

  try {
    POSTWritingsTableSchema.parse(data)
  } catch(error) {
    console.error("[api-writing] error: Invalid request", error)
    return NextResponse.json({ error: "Invalid request"}, {status:400})
  }

  // post the new card data
  const {rowContent, unemotionalContent, writer, cardId} = data as POSTWritingsRequest
  try {
    const [newCard] = await db.insert(writingsTable).values(
      {
        cardId,
        rowContent, 
        unemotionalContent,
        writer,
      }
    ).returning()
    return NextResponse.json({
      id: newCard.displayId,
      rowContent: newCard.rowContent,
      unemotionalContent: newCard.unemotionalContent,
      writer: newCard.writer,
      }, 
      { status: 200}
    )
  }catch (error) {
    console.log(error)
    console.log("[api-card] error: Internal Server Error");
      return NextResponse.json(
        {error: "Internal Server Error"},
        {status:500}
    );
  }
}