import { db } from "@/db";
import { writingsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params:{
            writingId:string;
        }
    },
) {
    try {
        const comments = await db.query.writingsTable.findFirst({
            where: eq(writingsTable.displayId, params.writingId),
            with: {
                writingComments: true,
            }
        });

        if(!comments) {
            console.log("[api-card] error: card id not found");
            return NextResponse.json({error: "card id not found"});
        }

        return NextResponse.json({
            comments: comments.writingComments,
        })
    } catch(error) {
        console.log("[api-comments] error: Internal Server Error");
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status:500}
        );
    }
}