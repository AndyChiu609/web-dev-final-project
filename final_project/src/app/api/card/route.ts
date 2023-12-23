import { db } from "@/db";
import { cardsTable } from "@/db/schema"
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTCardsTableSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(300),
  imageUrl: z.string().url().optional(),
})
type POSTCardsRequest = z.infer<typeof POSTCardsTableSchema>;

export async function POST(
    req: NextRequest,
  ) {
    const data = await req.json();
    // check the format of POST request
    try{
      POSTCardsTableSchema.parse(data)
    }catch(error) {
      console.error("[api-card] error: Invalid request", error)
      return NextResponse.json({ error: "Invalid request"}, {status:400})
    }
  
    // post the new card data
    const {title, content, imageUrl} = data as POSTCardsRequest
    try {
      const [newCard] = await db.insert(cardsTable).values(
        {
          title, 
          content,
          imageUrl,
        }
      ).returning()
      return NextResponse.json({
        id: newCard.displayId,
        title: newCard.title,
        content: newCard.content,
        imageUrl: newCard.imageUrl,
        date: newCard.date,
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

  export async function GET(req: NextRequest) {
    try {
        const dbCards = await db.query.cardsTable.findMany();

        if (!dbCards || dbCards.length === 0) {
            console.log("[api-card] error: no cards found");
            return NextResponse.json({ error: "No cards found" }, { status: 404 });
        }

        return NextResponse.json({
            cards: dbCards.map(dbCard => ({
                id: dbCard.displayId,
                title: dbCard.title,
                content: dbCard.content,
                imageUrl: dbCard.imageUrl,
                date: dbCard.date,
            }))
        }, { status: 200 });
    } catch (error) {
        console.log("[api-card] error: Internal Server Error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}