import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../database/knex.js';
import knex from 'knex';

type ProductRepository = {
  id?: number;
  name: string;
  price: number;
};

export class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const name =
        typeof req.query.name === 'string' ? req.query.name : '';

      const products = await db<ProductRepository>('products')
        .select('id', 'name', 'price')
        .whereLike('name', `%${name}%`);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().positive(),
      });

      const { name, price } = bodySchema.parse(req.body);

      await db('products').insert({ name, price });

      return res.status(201).json({ message: 'Produto criado' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform(Number)
        .refine((value) => !isNaN(value), { message: 'ID inválido' })
        .parse(req.params.id);
            const product = await db('products').where({ id }).first();
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      const bodySchema = z.object({
        name: z.string().trim().min(4).optional(),
        price: z.number().positive().optional(),
      });

      const data = bodySchema.parse(req.body);

      await db('products')
        .where({ id })
        .update(data);

      return res.json({ message: 'Produto atualizado' });
    } catch (error) {
      next(error);
    }
  }
async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform(Number)
        .refine((value) => !isNaN(value), { message: 'ID inválido' })
        .parse(req.params.id);
        const product = await db('products').where({ id }).first();
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      await db('products')
        .where({ id })
        .delete();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}