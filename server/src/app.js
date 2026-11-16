
import express from 'express';
import cors from 'cors';
import managerRoutes from './presentation/routes/managerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', managerRoutes);

export default app;
