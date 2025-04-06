import express from "express";
import { PinoLogger } from "@core/infrastructure";
import authRoutes from "@app/auth/infrastructure/auth.routes";
import seedRoutes from "@app/seed/infrastructure/seed.routes";
import productRoutes from "@app/products/infrastructure/products.routes";
import orderRoutes from "@app/orders/infrastructure/orders.routes";
import "@app/auth/infrastructure/sync-handlers/user-registered.handler";
import "@app/products/infrastructure/sync-handlers";
import "@app/products/infrastructure/sync-handlers/product-ordered.handler";
import "@app/orders/infrastructure/sync-handlers/order-created.handler";
import "@app/orders/infrastructure/sync-handlers/order-status-changed.handler";

const app = express();
const logger = PinoLogger.getInstance();
const PORT = 3000;

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  logger.log(`Server is running on port: ${PORT} 🚀`);
});
