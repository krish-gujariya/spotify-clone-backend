import express, { Router } from 'express'
import { homePage,  insertArtist,  insertUser, showFetchedGenres } from '../controllers/home';
const router:Router = express.Router();

router.get("/", homePage);

router.post("/insertUser", insertUser);

router.post("/insertAdmin", insertArtist);

router.get("/showGenre", showFetchedGenres);



export default router;