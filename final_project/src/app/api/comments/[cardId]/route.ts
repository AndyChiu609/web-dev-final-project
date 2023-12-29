import { db } from "@/db";
import { cardsTable} from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params:{
            cardId:string;
        }
    },
) {
    try {
        const comments = await db.query.cardsTable.findFirst({
            where: eq(cardsTable.displayId, params.cardId),
            with: {
                writingsComments: true,
            }
        });

        if(!comments) {
            console.log("[api-card] error: card id not found");
            return NextResponse.json({error: "card id not found"});
        }

        return NextResponse.json({
            comments: comments.writingsComments,
        })
    } catch(error) {
        console.log("[api-comments] error: Internal Server Error");
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status:500}
        );
    }
}