import express from "express";
import cors from "cors";
import categoryRoutes from "./routers/category.route";
import coursesRoutes from "./routers/course.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

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

// Error handler
app.use(errorHandler);

export default app;
