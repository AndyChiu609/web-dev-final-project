import { date, index, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const cardsTable = pgTable("crads",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title",{length:50}).notNull(),
    content: varchar("content",{length: 300}).notNull(),
    imageUrl: varchar("image_url").default("/1280.jpeg"),
    date:date("date").defaultNow(),
},
(table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    dateIndex: index("date_index").on(table.date),
}),
);