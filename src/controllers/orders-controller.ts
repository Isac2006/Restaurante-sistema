import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../database/knex.js';
import { AppError } from '@/utils/apperror.js';


class OrdersController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.coerce.number().int().positive(),
        product_id: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().positive(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(req.body);

      // Verificar sessão
      const session = await db('table_sessions').where({ id: table_session_id }).first();
      if (!session) throw new AppError('Table session not found', 404);
      if (session.closed_at) throw new AppError('Cannot add order to a closed table session', 400);

      // Verificar produto
      const product = await db('products').where({ id: product_id }).first();
      if (!product) throw new AppError('Product not found', 404);

      // Inserir ordem
      const result = await db('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      // Pegar ID da ordem (compatível PostgreSQL/MySQL)
      const orderId = Array.isArray(result) ? result[0] : result;

      return res.status(201).json({
        order: {
          id: orderId,
          table_session_id,
          product_id,
          quantity,
          price: product.price,
        },
        product_name: product.name,
        message: 'Order created successfully',
      });
    } catch (error) {
      console.error('Error creating order:', error);
      next(error);
    }
  }

async index(req: Request, res: Response, next: NextFunction) {
  try {
    const tableSessionId = Number(req.params.table_session_id);
    if (isNaN(tableSessionId) || tableSessionId <= 0) {
      throw new AppError("table_session_id is required and must be a positive number", 400);
    }

    const orders = await db('orders')
      .select(
        "orders.id as order_id",
        "orders.table_session_id",
        "orders.product_id",
        "orders.quantity",
        "orders.price",
        "products.name as product_name",
        db.raw("orders.price * orders.quantity as total_price")
      )
      .where({ table_session_id: tableSessionId })
      .leftJoin("products", "orders.product_id", "products.id");

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    next(error);
  }
}


async show(req: Request, res: Response, next: NextFunction) {
  try {
    const tableSessionId = Number(req.params.table_session_id);
    if (!tableSessionId) throw new AppError("table_session_id is required", 400);

    const order = await db('orders')
      .select(db.raw('COALESCE(SUM(price * quantity), 0) as total'))
      .where({ table_session_id: tableSessionId })
      .first();

    return res.status(200).json({ total: order?.total ?? 0 });
  } catch (error) {
    console.error('Error fetching total order:', error);
    next(error);
  }
}


}

export { OrdersController };
