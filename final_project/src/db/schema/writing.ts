import { relations } from "drizzle-orm";
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { cardsTable } from "./cards";

export const writingsTable = pgTable("writing",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    rowContent:varchar("rowContent",{length:300}).notNull().default("Click to Type Something..."),
    unemotionalContent:varchar("aiContent",{length:300}).notNull().default(""),
    writer:varchar("writer",{length: 50}).default("anonymous"),
    cardId: uuid("card_id").notNull().references(()=>cardsTable.displayId),
})
export const writingRelation = relations(writingsTable, ({many}) => ({
    writingComments: many(commentsTable),
}),
)

export const commentsTable = pgTable("comments",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    content: varchar("content",{length: 100}).notNull(),
    writingId: uuid("writing_id").notNull(),
})

export const commentsRelation = relations(commentsTable, ({one}) => ({
    writing: one(writingsTable, {
        fields: [commentsTable.writingId],
        references: [writingsTable.displayId]
    }),
})
)