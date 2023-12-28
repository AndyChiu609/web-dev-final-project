import { db } from "@/db";
import { cardsTable } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const POSTCardsTableSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(300),
  imageUrl: z.string().url().optional(),
})
type POSTCardsRequest = z.infer<typeof POSTCardsTableSchema>;

const PUTCardsTableSchema = z.object({
  id: string().min(1),
  title: z.string().min(1).max(50).optional(),
  description: z.string().min(1).max(300).optional(),
  imageUrl: z.string().url().optional(),
  rowContent: string().min(1).max(300),
  unemotionalContent: string().min(1).max(300),
})
type PUTCardsRequest = z.infer<typeof PUTCardsTableSchema>;


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
    const {title, description, imageUrl} = data as POSTCardsRequest
    try {
      const [newCard] = await db.insert(cardsTable).values(
        {
          title, 
          description,
          imageUrl,
        }
      ).returning()
      return NextResponse.json({
        id: newCard.displayId,
        title: newCard.title,
        description: newCard.description,
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
                description: dbCard.description,
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

export async function PUT(
  req:NextRequest
) {
  const data = await req.json();
    // check the format of POST request
    try{
      PUTCardsTableSchema.parse(data)
    }catch(error) {
      console.error("[api-card] error: Invalid request", error)
      return NextResponse.json({ error: "Invalid request"}, {status:400})
    }
  
    // post the new card data
    const {id, title, description, imageUrl, 
      rowContent, unemotionalContent} = data as PUTCardsRequest

    try {
      const [newCard] = await db.update(cardsTable)
        .set({ 
          title,
          description,
          imageUrl,
          rowContent, 
          unemotionalContent})
        .where(eq(cardsTable.displayId, id))
        .returning();
        return NextResponse.json({
          id: newCard.displayId,
          title: newCard.title,
          description: newCard.description,
          imageUrl: newCard.imageUrl,
          rowContent:newCard.rowContent,
          unemotionalContent: newCard.unemotionalContent,
          date: newCard.date,
          }, 
          { status: 200}
        ) 

    } catch (error) {
      console.log(error)
      console.log("[api-card] error: Internal Server Error");
        return NextResponse.json(
          {error: "Internal Server Error"},
          {status:500}
      );
    }

}