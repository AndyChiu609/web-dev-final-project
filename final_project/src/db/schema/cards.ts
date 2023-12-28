import { date, index, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";


export const cardsTable = pgTable("cards",{
    id:serial("id").primaryKey(),
    displayId:uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title",{length:50}).notNull(),
    description: varchar("description",{length: 300}),
    imageUrl: varchar("image_url").default("/1280.jpeg"),
    date:date("date").defaultNow(),
},
(table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    dateIndex: index("date_index").on(table.date),
}),
);