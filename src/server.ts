import express, {response} from 'express';
import sequelize from './sequelize/database';
import routes from "./routes/routes";
import HttpCodes from "http-status-codes";
import logger from "./logger";
import authrouter from './routes/auth.routes';
import { routeAccessSecret } from './middleware/routeAccessSecret.middleware;';

const _fileName = module.filename.split("/").pop();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', routes);
app.use('/api/auth', authrouter);

app.use((req, res, next) => {
    if (!req.timedout) next();
});

app.listen(port, async () => {
   if (process.env.NODE_ENV !== 'production'){
       try {
           await sequelize.authenticate();
        //    await sequelize.sync({force: true});
           logger.info(`Server is running on http://localhost:${port} - ${_fileName}`);
       } catch (error) {
           response.status(HttpCodes.BAD_GATEWAY);
           logger.error(`Unable to run server: ${error} - ${_fileName}`);
           process.exit(1);
       }
   }
});
