import { db } from "@/db";
import { writingsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: {
            cardId: string;
        };
    },
) {
    try {
        const dbWriting = await db.query.writingsTable.findFirst({
            where:  eq(writingsTable.cardId, params.cardId),
        });

        if(!dbWriting) {
            console.log("[api-writing] error: card id not found");
            return NextResponse.json({error: "card id not found"});
        }
        return NextResponse.json({
            id: dbWriting.displayId,
            rowContent: dbWriting.rowContent,
            unemotionalContent: dbWriting.unemotionalContent,
            writer: dbWriting.writer,
        })
    }catch(error) {
        console.log("[api-writing] error: Internal Server Error");
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status:500}
        );
    }
}