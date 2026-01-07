import { Router } from "express";
import { tablesSessionsRoutes } from "./table_sessions-routes.js";
import { productsRouter } from "./products-routes.js";
import { tablesRouter } from "./tables-routes.js";
import { ordersRouter } from "./orders-routes.js";
const router = Router();

router.use("/products", productsRouter);
router.use("/tables", tablesRouter);
router.use("/table-sessions", tablesSessionsRoutes);
router.use("/orders", ordersRouter);
export { router };
