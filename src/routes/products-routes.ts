import {Router} from 'express';

import {ProductsController} from '../controllers/products-controller.js';


const productsRouter = Router();
const productsController = new ProductsController();




productsRouter.get("/",productsController.index);

export {productsRouter};