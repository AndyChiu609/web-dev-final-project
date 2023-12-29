import { db } from "@/db";
import { commentsTable} from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTCommentsTableSchema = z.object({
  content: z.string().min(1).max(100),
  cardId: z.string(),
})
type POSTCommentsRequest = z.infer<typeof POSTCommentsTableSchema>;

export async function POST(
  req:NextRequest,
) {
  const data = await req.json();

  try {
    POSTCommentsTableSchema.parse(data)
  } catch(error) {
    console.error("[api-Comment] error: Invalid request", error)
    return NextResponse.json({ error: "Invalid request"}, {status:400})
  }

  // post the new card data
  const { content, cardId } = data as POSTCommentsRequest;
  try {
    const [newComment] = await db.insert(commentsTable).values(
        {
        content,
        cardId,
    }).returning()
    return NextResponse.json({
      id: newComment.displayId,
      content: newComment.content,
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