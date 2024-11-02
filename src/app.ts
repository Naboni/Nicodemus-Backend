import dotenv from 'dotenv';
import morgan from "morgan";
import helmet from 'helmet';
import bodyParser from "body-parser";
import express, { Application } from 'express';

import routes from "@/routes";
import Bootstrap from '@/bootstrap';
import { errorHandler } from '@/utils/errotHandler';
import accessLogStream from '@/utils/access-log-stream';

dotenv.config();

const app: Application = express();
app.use(errorHandler);
app.use(express.json());
app.use(
  morgan("dev", {
    stream: accessLogStream,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

Bootstrap(app);
app.use('/api', routes);
