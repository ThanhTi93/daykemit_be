import { AppDataSource } from "../config/data-source";
import { Account } from "../entities/account.entity";
import { AccountDto, UpdateAccountDto } from "../dtos/account.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UploadService } from "./upload.service";
import { LoginDto } from "../dtos/login.dto";

export class AccountService {
  private accountRepo = AppDataSource.getRepository(Account);

  // Lấy tất cả
  async findAll() {
    return this.accountRepo.find();
  }

  // Lấy 1
  async findOne(id: number) {
    const account = await this.accountRepo.findOneBy({ id });
    if (!account) throw new Error("Account not found");
    return account;
  }

  // Tạo mới
  async create(payload: AccountDto) {
    // CHECK EMAIL
    const existingEmail = await this.accountRepo.findOne({
      where: { email: payload.email },
    });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // CHECK USERNAME
    const existingUsername = await this.accountRepo.findOne({
      where: { username: payload.username },
    });

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // HASH PASSWORD
    const hashed = await bcrypt.hash(payload.password, 10);

    const account = this.accountRepo.create({
      ...payload,
      password: hashed,
    });

    return this.accountRepo.save(account);
  }

  // Cập nhật (refactor giống mentor style)
  async update(
    id: number,
    payload: UpdateAccountDto,
    file?: Express.Multer.File
  ) {
    const account = await this.findOne(id);

    if (payload.email !== undefined) {
      account.email = payload.email;
    }

    if (payload.username !== undefined) {
      account.username = payload.username;
    }

    if (payload.phone !== undefined) {
      account.phone = payload.phone;
    }

    if (payload.role !== undefined) {
      account.role = payload.role;
    }

    if (payload.status !== undefined) {
      account.status = payload.status;
    }

    // hash password
    if (payload.password) {
      account.password = await bcrypt.hash(payload.password, 10);
    }

    // xử lý avatar
    if (file) {
      if (account.imgUrl) {
        try {
          const publicId =
            account.imgUrl.split("/").pop()?.split(".")[0];

          if (publicId) {
            await UploadService.deleteImage(
              `accounts/${publicId}`
            );
          }
        } catch (err) {
          console.log("Delete image error:", err);
        }
      }

      const upload = await UploadService.uploadSingle(file);
      account.imgUrl = upload.url;
    }

    return this.accountRepo.save(account);
  }

  async login(payload : LoginDto) {
    const user = await this.accountRepo.findOne({
      where: { email: payload.email },
    });

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(payload.password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken, user };
  }

  async refresh(refreshToken: string) {
    const payload: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    );

    const accessToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return { accessToken };
  }
  
   async me(accessToken: string) {
    const payload: any = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    );

    const user = await this.accountRepo.findOne({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...safeUser } = user;

    return safeUser;
  }
  
  // Soft delete
  async softDelete(id: number) {
    const account = await this.findOne(id);
    account.status = false;
    return this.accountRepo.save(account);
  }

  // Hard delete
  async hardDelete(id: number) {
    const account = await this.findOne(id);
    return this.accountRepo.remove(account);
  }
}
