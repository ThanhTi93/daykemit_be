import { Router } from "express";
import multer from "multer";

import { AccountController } from "../controllers/account.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { AccountDto, UpdateAccountDto } from "../dtos/account.dto";
import { LoginDto } from "../dtos/login.dto";

const router = Router();

// 👉 dùng instance thay vì static
const controller = new AccountController();

// 👉 nếu không upload file thì có thể bỏ multer
const upload = multer({
  storage: multer.memoryStorage(),
});

// ================== ROUTES ==================

// GET ALL
router.get(
  "/",
  controller.getAll.bind(controller)
);
router.post("/login", validateDTO(LoginDto), controller.login.bind(controller));

router.post("/logout", controller.logout.bind(controller));

router.post("/refresh", controller.refresh.bind(controller));

router.get("/me", controller.me.bind(controller));

// GET BY ID
router.get(
  "/:id",
  controller.getOne.bind(controller)
);

// CREATE
router.post(
  "/",
  validateDTO(AccountDto),
  controller.create.bind(controller)
);

// UPDATE
router.put(
  "/:id",
  upload.single("imgUrl"),
  validateDTO(UpdateAccountDto),
  controller.update.bind(controller)
);

router.delete(
  "/:id",
  controller.softDelete.bind(controller)
);



export default router;
