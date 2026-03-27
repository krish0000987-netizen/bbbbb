import { sql } from "drizzle-orm";
import { index, json, mysqlTable, timestamp, varchar, boolean, text } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

export const roleEnum = ["admin", "manager", "support", "user"] as const;

export const sessions = mysqlTable(
  "sessions",
  {
    sid: varchar("sid", { length: 255 }).primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => uuidv4()),
  username: varchar("username", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow().defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

