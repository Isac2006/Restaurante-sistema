import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
// 1. IMPORTAÇÃO CORRETA: Importe a instância do knex que você configurou
import { db } from '../database/knex.js' '../database/knex.js'; 

// 2. DEFINIÇÃO DO TIPO: Isso resolve o erro "Cannot find name 'productRepository'"
type productRepository = {
  id?: number;
  name: string;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export class ProductsController {
  async index(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Opcional: buscar produtos reais para testar o GET
      const products = await knex<productRepository>('products').select('*');
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().positive(),
      });

      const { name, price } = bodySchema.parse(req.body);

      // 3. EXECUÇÃO: Agora o knex sabe onde está o seu database.db
      await knex<productRepository>('products').insert({
        name,
        price
      });

      return res.status(201).json();
    } catch (error) {
      // Log para você ver o erro real no terminal do VS Code
      console.error("Erro no Banco de Dados:", error);
      next(error);
    }
  }
}