import { AccountModel } from "../models/account.model";
import { type Account, type NewAccount } from "../config/schema";

export class AccountService {
  static async getAll(): Promise<Account[]> {
    return AccountModel.getAll();
  }

  static async getById(id: number): Promise<Account> {
    const data = await AccountModel.getById(id);
    if (!data) throw { status: 404, message: "Account not found" };
    return data;
  }

  static async create(data: NewAccount): Promise<Account> {
    return AccountModel.create(data);
  }

  static async update(id: number, data: Partial<NewAccount>): Promise<Account> {
    const updated = await AccountModel.update(id, data);
    if (!updated) throw { status: 404, message: "Account not found" };
    return updated;
  }

  static async delete(id: number): Promise<void> {
    const deleted = await AccountModel.delete(id);
    if (!deleted) throw { status: 404, message: "Account not found" };
  }
}
