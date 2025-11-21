import express from "express";
import "dotenv/config";
import cors from "cors";

// Import Routes
import ProductRoute from "./src/routes/ProductRoute.js";
import CategoryRoute from "./src/routes/CategoryRoute.js";

// Import Database
import sequelize from "./src/config/database.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// Check Connection
const checkDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error(`Unable to connect to the database: `, error);
  }
};

// API Product
app.use("/api/product", ProductRoute);

// API Category
app.use("/api/category", CategoryRoute);

app.listen(PORT, () => {
  console.log(`Sever is running on port: ${PORT}`);
  checkDatabase();
});
