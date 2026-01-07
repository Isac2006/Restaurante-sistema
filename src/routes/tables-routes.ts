import { Router } from "express";
import { TablesController } from "../controllers/tables-controller.js";

const tablesRouter = Router();
const tablesController = new TablesController();

// NÃO repita "/tables" aqui
tablesRouter.get("/", tablesController.index.bind(tablesController));

export { tablesRouter };
