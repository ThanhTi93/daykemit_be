import { db } from "../config/db";
import { accounts, type Account, type NewAccount } from "../config/schema";
import { eq } from "drizzle-orm";

export class AccountModel {
  static async getAll(): Promise<Account[]> {
    return db.select().from(accounts);
  }

  static async getById(id: number): Promise<Account | null> {
    const [row] = await db.select().from(accounts).where(eq(accounts.id, id));
    return row ?? null;
  }

  static async create(data: NewAccount): Promise<Account> {
    const [newRow] = await db.insert(accounts).values(data).returning();
    return newRow;
  }

  static async update(id: number, data: Partial<NewAccount>): Promise<Account | null> {
    const [updated] = await db.update(accounts).set(data).where(eq(accounts.id, id)).returning();
    return updated ?? null;
  }

  static async delete(id: number): Promise<boolean> {
    const [deleted] = await db.delete(accounts).where(eq(accounts.id, id)).returning();
    return !!deleted;
  }
}
