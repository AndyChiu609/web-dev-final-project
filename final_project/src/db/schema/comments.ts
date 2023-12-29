import { relations } from "drizzle-orm"
import { writingsTable } from "./writing"
import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core"

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