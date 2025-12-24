import { AppDataSource } from "../config/data-source";
import { Account } from "../entities/account.entity";
import bcrypt from "bcrypt";

export const AccountService = {
  // Lấy tất cả
  findAll: async () => {
    return AppDataSource.getRepository(Account).find();
  },

  // Lấy 1
  findOne: async (id: number) => {
    const account = await AppDataSource.getRepository(Account).findOneBy({ id });
    if (!account) throw new Error("Account not found");
    return account;
  },

  // Tạo mới
  create: async (payload: any) => {
    const repo = AppDataSource.getRepository(Account);

    const hashed = await bcrypt.hash(payload.password, 10);

    const account = repo.create({
      ...payload,
      password: hashed,
    });

    return repo.save(account);
  },

  // Cập nhật
  update: async (id: number, payload: any) => {
    const repo = AppDataSource.getRepository(Account);
    const found = await repo.findOneBy({ id });
    if (!found) throw new Error("Account not found");

    // Nếu có password mới → mã hoá
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updated = repo.merge(found, payload);
    return repo.save(updated);
  },

  // Soft delete
  softDelete: async (id: number) => {
    const repo = AppDataSource.getRepository(Account);
    const found = await repo.findOneBy({ id });
    if (!found) throw new Error("Account not found");

    found.status = false;
    return repo.save(found);
  },

  // Hard delete
  hardDelete: async (id: number) => {
    const repo = AppDataSource.getRepository(Account);
    const found = await repo.findOneBy({ id });
    if (!found) throw new Error("Account not found");

    return repo.remove(found);
  },
};
