import express from 'express'
import { configDotenv } from 'dotenv';
configDotenv();
import router from './routes/home'
import path from 'path';
import { logger } from './utils/pino';

const app = express()
const port:string|number = process.env.PORT|| 9000;

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "../src/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( "../public"));


app.use(router);


app.listen(port, ()=>{logger.info(`App is listning on port no. ${port}`);
})