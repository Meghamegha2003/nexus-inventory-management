import express from 'express';
import cors from 'cors';

import managerRoutes from './presentation/routes/managerRoutes.js';
import productRoutes from './presentation/routes/productRoutes.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/', managerRoutes);
app.use('/master/product', productRoutes);

export default app;