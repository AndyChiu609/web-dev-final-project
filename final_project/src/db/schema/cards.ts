import { relations } from "drizzle-orm";
import { date, index, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { writingsTable } from "./writing";


export const cardsTable = pgTable("cards",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title",{length:50}).notNull(),
    description: varchar("description",{length: 1000}),
    rowContent:varchar("rowContent",{length:1000}).notNull().default("Click to Type Something..."),
    unemotionalContent:varchar("aiContent",{length:300}).notNull().default(""),
    
    imageUrl: varchar("image_url").default("/1280.jpeg"),
    date:date("date").defaultNow(),
},
(table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    dateIndex: index("date_index").on(table.date),
}),
);

export const cardsRelation = relations(cardsTable, ({one}) => ({
    cardsWriting: one(writingsTable, {
        fields: [cardsTable.displayId],
        references: [writingsTable.cardId]
    })
}))
