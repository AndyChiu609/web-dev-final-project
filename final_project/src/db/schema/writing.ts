import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { cardsTable } from "./cards";
import { commentsTable } from "./comments";

export const writingsTable = pgTable("writing",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    rowContent:varchar("rowContent",{length:1000}).notNull().default("Click to Type Something..."),
    unemotionalContent:varchar("aiContent",{length:1000}).notNull().default(""),
    writer:varchar("writer",{length: 50}).default("anonymous"),
    cardId: uuid("card_id").notNull().references(()=>cardsTable.displayId),
})
export const writingRelation = relations(writingsTable, ({many}) => ({
    writingComments: many(commentsTable),
}),
)

