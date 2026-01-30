import express from "express";
import cors from "cors";
import categoryRoutes from "./routers/category.route";
import coursesRoutes from "./routers/course.route";
import accountRoutes from "./routers/account.route";
import uploadRoute from "./routers/upload.route";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // FE URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // nếu có cookie/auth
}));

// Body parser
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", coursesRoutes );
app.use("/api/accounts", accountRoutes );
app.use("/api/upload", uploadRoute);
// Error handler
app.use(errorHandler);

export default app;
