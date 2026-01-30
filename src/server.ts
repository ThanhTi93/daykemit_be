import "reflect-metadata"; // cần thiết cho TypeORM
import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Data Source has been initialized! Tables will be created if needed.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization:", err);
  });
