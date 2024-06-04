import express, { Router } from "express";
import {
  homePage,
} from "../controllers/home";
import { albumValidation, artistValidation, commonValidation, commonValidationOnUrl, songInPlaylistValidate, songValidation, userValidation } from "../middlewares/dataValidation";
import { createPlaylists, insertAlbum, insertArtist, insertFollowers, insertPlayedSongRecord, insertSong, insertSongInPlaylistRecord, insertUser } from "../controllers/create";
import { showAlbumData, showFetchArtist, showFetchedGenres, showFetcheUser, showFollowersList, showLikedSongData, showPlayedSongData, showPlaylistsData, showSongsData, showSongsOfPlaylist, showTotalSongListen } from "../controllers/read";
import {  updateAlbumData, updateArtistData, updateSongData, updateUserData } from "../controllers/update";
const router: Router = express.Router();

router.get("/", homePage);

// Create operations
router.post("/insertUser",userValidation, insertUser);
router.post("/insertArtist",artistValidation, insertArtist);
router.post("/insertSong",songValidation, insertSong);
router.post("/insertAlbums",albumValidation, insertAlbum);
router.post("/insertPlaylists",commonValidation, createPlaylists);
router.post("/insertSongsInPlaylists",songInPlaylistValidate, insertSongInPlaylistRecord);
router.post("/insertPlayedSongList",songInPlaylistValidate, insertPlayedSongRecord);
router.post("/insertFollowers",songInPlaylistValidate, insertFollowers);



// Read Operations
router.get("/showGenre", showFetchedGenres);
router.get("/showAlbum", showAlbumData);
router.get("/showSongs", showSongsData);
router.get("/showArtists", showFetchArtist);
router.post("/showUsers", showFetcheUser);
router.get("/showPlayedSongs", showPlayedSongData);
router.get("/showLikedSongs",commonValidationOnUrl, showLikedSongData);
router.get("/showPlaylists",commonValidationOnUrl, showPlaylistsData);
router.get("/showSongsOfPlaylists", showSongsOfPlaylist);
router.get("/showTotalListnerOfSongs", showTotalSongListen);
router.get("/showFollowerList", showFollowersList);


// Update Operations
router.post("/updateSong",commonValidation, updateSongData);
router.post("/updateArtist",commonValidation, updateArtistData);
router.post("/updateUser",commonValidation, updateUserData);
router.post("/updateAlbum",commonValidation, updateAlbumData);





export default router;
