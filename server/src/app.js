
import express from 'express';
import cors from 'cors';
import managerRoutes from './presentation/routes/managerRoutes.js';
import productRoutes from './presentation/routes/productRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', managerRoutes);
app.use('/master/product',productRoutes)

export default app;
