import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

router.get("/", AccountController.getAll);
router.get("/:id", AccountController.getOne);
router.post("/", AccountController.create);
router.put("/:id", AccountController.update);
router.patch("/soft-delete/:id", AccountController.softDelete);
router.delete("/:id", AccountController.hardDelete);

export default router;
