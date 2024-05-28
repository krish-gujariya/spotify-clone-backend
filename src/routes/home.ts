import express, { Router } from 'express'
import { homePage } from '../controllers/home';
const router:Router = express.Router();

router.get("/", homePage);


export default router;