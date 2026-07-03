import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api', routes);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

export default app;
