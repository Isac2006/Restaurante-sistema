import { Router } from 'express';
import { OrdersController } from '../controllers/orders-controller.js';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.createOrder.bind(ordersController));
ordersRouter.get('/:table_session_id', ordersController.index.bind(ordersController));
ordersRouter.get('/:table_session_id/total', ordersController.show.bind(ordersController));

export { ordersRouter };