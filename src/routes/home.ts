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
  showLikedSongData,
  createPlaylists,
  showPlaylistsData
} from "../controllers/home";
import { albumValidation, artistValidation, commonValidation, songValidation, userValidation } from "../middlewares/dataValidation";
const router: Router = express.Router();

router.get("/", homePage);

// Create operations
router.post("/insertUser",userValidation, insertUser);
router.post("/insertArtist",artistValidation, insertArtist);
router.post("/insertSong",songValidation, insertSong);
router.post("/insertAlbums",albumValidation, insertAlbum);
router.post("/insertPlaylists",commonValidation, createPlaylists);



// Read Operations
router.get("/showGenre", showFetchedGenres);
router.get("/showAlbum", showAlbumData);
router.get("/showSongs", showSongsData);
router.get("/showArtists", showFetchArtist);
router.post("/showUsers", showFetcheUser);
router.get("/showPlayedSongs", showPlayedSongData);
router.get("/showLikedSongs", showLikedSongData);
router.get("/showPlaylists", showPlaylistsData);



// Update Operations
router.post("/updateSong",commonValidation, updateSongData);
router.post("/updateArtist",commonValidation, updateArtistData);
router.post("/updateUser",commonValidation, updateUserData);
router.post("/updateAlbum",commonValidation, updateAlbumData);

router.post("/deleteUser", deleteuser);




export default router;
