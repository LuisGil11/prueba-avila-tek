import express from "express";
import { PinoLogger } from "@core/infraestructure";
import authRoutes from "@app/auth/infraestructure/auth.routes";
import seedRoutes from "@app/seed/infraestructure/seed.routes";
import productRoutes from "@app/products/infraestructure/products.routes";
import orderRoutes from "@app/orders/infraestructure/orders.routes";
import "@app/auth/infraestructure/sync-handlers/user-registered.handler";
import "@app/products/infraestructure/sync-handlers";
import "@app/orders/infraestructure/sync-handlers/order-created.handler";

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
