import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * File uploads tracking - stores metadata about uploaded Excel and PPTX files
 */
export const fileUploads = mysqlTable("file_uploads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileType: mysqlEnum("fileType", ["excel", "pptx"]).notNull(),
  fileUrl: text("fileUrl").notNull(), // S3 URL
  fileSize: int("fileSize").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = typeof fileUploads.$inferInsert;

/**
 * Mapping records - stores detected mappings between Excel and PPTX elements
 */
export const mappings = mysqlTable("mappings", {
  id: int("id").autoincrement().primaryKey(),
  updateId: int("updateId").notNull(),
  slideNumber: int("slideNumber").notNull(),
  elementType: mysqlEnum("elementType", ["table", "chart", "text"]).notNull(),
  elementName: varchar("elementName", { length: 255 }).notNull(),
  excelSheet: varchar("excelSheet", { length: 50 }).notNull(),
  excelRange: varchar("excelRange", { length: 50 }).notNull(),
  transformationType: mysqlEnum("transformationType", ["direct_copy", "series_update", "calculation", "text_replace"]).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["pending", "success", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Mapping = typeof mappings.$inferSelect;
export type InsertMapping = typeof mappings.$inferInsert;

/**
 * Update records - tracks each PPTX update operation
 */
export const updates = mysqlTable("updates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  excelFileId: int("excelFileId").notNull().references(() => fileUploads.id),
  pptxFileId: int("pptxFileId").notNull().references(() => fileUploads.id),
  excelFileName: varchar("excelFileName", { length: 255 }).notNull(),
  pptxFileName: varchar("pptxFileName", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["processing", "completed", "failed"]).default("processing").notNull(),
  mappingsCount: int("mappingsCount").default(0),
  elementsUpdated: int("elementsUpdated").default(0),
  outputFileUrl: text("outputFileUrl"), // S3 URL to updated PPTX
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Update = typeof updates.$inferSelect;
export type InsertUpdate = typeof updates.$inferInsert;