import { relations } from "drizzle-orm"
import { writingsTable } from "./writing"
import { index, pgTable, serial, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { cardsTable } from "./cards"

export const commentsTable = pgTable("comments",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("user",{length: 100}).notNull().default("anonymous"),
    timestamp: timestamp("time").defaultNow(),
    content: varchar("content",{length: 100}).notNull(),
    cardId: uuid("writing_id").notNull(),
},
(table) => ({
    timeIndate: index("time_index").on(table.timestamp),
}))

export const commentsRelation = relations(commentsTable, ({one}) => ({
    writing: one(cardsTable, {
        fields: [commentsTable.cardId],
        references: [cardsTable.displayId]
    }),
})
)