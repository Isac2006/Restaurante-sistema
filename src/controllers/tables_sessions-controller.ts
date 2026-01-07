import { Request, Response, NextFunction, response } from "express";
import { z } from "zod";
import { db } from "../database/knex.js";
import { AppError } from "@/utils/apperror.js";

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.coerce.number(),
      });
     
      const { table_id } = bodySchema.parse(req.body);
       const sessions = await db("table_sessions").where({table_id}).orderBy("opened_at", "desc").first();
 
      if (sessions && !sessions.closed_at) {
        throw new AppError("There is already an open session for this table.", 400); }


      await db("table_sessions").insert({
        table_id,
        opened_at: new Date()
      });

      return res.status(201).json({
        message: "Table session created successfully",
      });
    } catch (error) {
      console.error(error); // 👈 OBRIGATÓRIO
      next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await db("table_sessions").select("*").orderBy("opened_at", "desc");
      return res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      next(error);
    }
} 
 async update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = z.string()
      .transform(Number)
      .refine((value) => !isNaN(value), { message: "Invalid ID" })
      .parse(req.params.id);

    const session = await db("table_sessions").where({ id }).first();

    if (!session) {
      throw new AppError("Table session not found.", 404);
    }
    if(session.closed_at){
      throw new AppError("Table session is already closed.", 400);
    }
    await db("table_sessions")
      .where({ id })
      .update({ closed_at: new Date() });

    return res.json({ message: `Update table session with id ${id}` });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

}
