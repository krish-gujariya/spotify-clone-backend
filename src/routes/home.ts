import express, { Router } from "express";
import {
  homePage,
  insertAlbum,
  insertArtist,
  insertSong,
  insertUser,
  showAlbumData,
  showFetchedGenres,
  showSongsData,
  updateAlbumData,
  updateArtistData,
  updateSongData,
  updateUserData,
  showFetchArtist,
  showFetcheUser,
  deleteuser,
  showPlayedSongData,
  showLikedSongData
} from "../controllers/home";
const router: Router = express.Router();

router.get("/", homePage);

// Create operations
router.post("/insertUser", insertUser);
router.post("/insertArtist", insertArtist);
router.post("/insertSong", insertSong);
router.post("/insertAlbums", insertAlbum);



// Read Operations
router.get("/showGenre", showFetchedGenres);
router.get("/showAlbum", showAlbumData);
router.get("/showSongs", showSongsData);
router.get("/showArtists", showFetchArtist);
router.post("/showUsers", showFetcheUser);
router.get("/showPlayedSongs", showPlayedSongData);
router.get("/showLikedSongs", showLikedSongData);



// Update Operations
router.post("/updateSong", updateSongData);
router.post("/updateArtist", updateArtistData);
router.post("/updateUser", updateUserData);
router.post("/updateAlbum", updateAlbumData);

router.post("/deleteUser", deleteuser);




export default router;
