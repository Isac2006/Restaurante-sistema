import { Request, Response, NextFunction } from "express";
import { db } from "../database/knex.js";

type TableRepository = {
  id: number;
  table_number: number;
  created_at: string;
  updated_at: string;
};

class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await db<TableRepository>("tables")
        .select()
        .orderBy("table_number");

      return res.status(200).json(tables);
    } catch (error) {
      next(error);
    }
  }
}

export { TablesController };
