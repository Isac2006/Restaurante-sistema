import express from 'express';

import { router } from './routes/index.js';
import { errorHandling } from './middlewares/error-handling.js';

const port = 3333;
const app = express();
app.use(express.json());
app.use(router);


app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});