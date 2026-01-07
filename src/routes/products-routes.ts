import { Router } from 'express';
import { ProductsController } from '../controllers/products-controller.js';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index.bind(productsController));
productsRouter.post('/', productsController.create.bind(productsController));
productsRouter.put('/:id', productsController.update.bind(productsController));
productsRouter.delete('/:id', productsController.remove.bind(productsController));

export { productsRouter };
