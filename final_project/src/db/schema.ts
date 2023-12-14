import { date, index, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const cardsTable = pgTable("crads",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    content: varchar("content",{length: 300}).notNull(),
    date:date("date").defaultNow(),
},
(table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    dateIndex: index("date_index").on(table.date),
}),
);