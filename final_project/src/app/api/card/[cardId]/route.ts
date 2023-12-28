import { db } from "@/db";
import { cardsTable } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params:{
            cardId: string;
        };
    },
) {
    try {
        const dbCard = await db.query.cardsTable.findFirst({
            where: eq(cardsTable.displayId, params.cardId),
        });

        if(!dbCard) {
            console.log("[api-card] error: card id not found");
            return NextResponse.json({error: "card id not found"});
        }
        return NextResponse.json({
            id: dbCard.displayId,
            title: dbCard.title,
            description: dbCard.description,
            rowContent: dbCard.rowContent,
            unemotionalContent: dbCard.unemotionalContent,
            imageUrl: dbCard.imageUrl,
            date: dbCard.date,
        }, { status: 200})
    } catch(error) {
        console.log("[api-card] error: Internal Server Error");
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status:500}
        );
    }
}

