import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apperror.js';



export class ProductsController {
  async index(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {


      return res.json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }
}
