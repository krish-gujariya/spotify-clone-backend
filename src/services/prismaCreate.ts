import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import {
  IAlbumData,
  IArtistData,
  ISongInsertdata,
  IUserData,
} from "../types/generalInterface";
import { genPassword, returnObjectFunction } from "../utils/usefullFunction";
import { successMessage } from "../utils/generalVariables";
import {
  artistCheck,
  checkForUserAlreadyExist,
  fetchSongsFromPlaylists,
  userExistBasedeOnId,
} from "./fetchingQueryForCondition";

const prisma = new PrismaClient();

// Insert into user Table

const insertUserData = async (userData: IUserData) => {
  const date = new Date(userData.dob);
  userData.dob = date;
  try {
    const result = await checkForUserAlreadyExist(userData.email);
    if (result.success) {
      userData.password = await genPassword(userData.password);
      const data = await prisma.users.create({
        data: userData,
      });
      return returnObjectFunction(true, "User Created SuccessFully...", data);
    } else {
      return returnObjectFunction(false, result.message);
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, "Something Went Wrong...");
  }
};

// Inset into artist table

const insertArtistData = async (artistData: IArtistData) => {
  try {
    artistData.password = await genPassword(artistData.password);
    const result = await artistCheck(artistData.email);
    if (result.success) {
      const data = await prisma.artists.create({
        data: artistData,
      });
      return returnObjectFunction(true, "Artist Created SuccessFully...", data);
    } else {
      return returnObjectFunction(false, result.message);
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, "Something Went Wrong...");
  }
};

// Inserting Genres ++ Insert multiple record
const insertGenreData = async (): Promise<{ success: boolean }> => {
  try {
    await prisma.genres.createMany({
      data: [
        { name: "Indie" },
        { name: "Romance" },
        { name: "BollyWood" },
        { name: "Tamil" },
        { name: "Gujarati" },
        { name: "Hip Hop" },
        { name: "Jazz" },
        { name: "Electronic" },
      ],
      skipDuplicates: true, // It's Skip duplicate value in table
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

insertGenreData();

// Insert into Albums table

const insertAlbumData = async (albumData: IAlbumData) => {
  const dateSt = new Date(albumData.release_date);
  albumData.release_date = dateSt;
  try {
    await prisma.albums.create({
      data: albumData,
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

// Insert into Songs table

const insertSongData = async (songObject: ISongInsertdata) => {
  try {
    // const artistIdArray: { artist_id: number }[] = [];
    // console.log(songObject.artist_id)
    // songObject.artist_id.forEach((element) => {
    //   artistIdArray.push({ artist_id: element });
    // });

    await prisma.songs.create({
      data: {
        name: songObject.name,
        duration: songObject.duration,
        genre_id: songObject.genre_id,
        artists_songs: {
          createMany: {
            data: songObject?.artist_id?.map((id) => ({ artist_id: id })) || [],
          },
        },
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

// Insert into playlists table
const insertPlaylistData = async (name: string, id: number) => {
  try {
    const result = await userExistBasedeOnId(id);
    if (result.success) {
      const data = await prisma.playlists.create({
        data: { name: name, user_id: id },
      });
      return returnObjectFunction(true, successMessage.playlists, data);
    } else {
      return returnObjectFunction(false, result.message);
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, `${(error as Error).message}`, null);
  }
};

const insertSongInPlaylist = async (playlistId: number, songIds: number[]) => {
  try {
    const songData = await fetchSongsFromPlaylists(songIds, playlistId);
    if (songData.success) {
      const missingId = songIds.filter((element) => !(songData.result as number[]).includes(element));

      if (missingId.length == 0) {
        return returnObjectFunction(
          false,
          "Songs are already exists in playlists"
        );
      } else {
        const data = await prisma.playlist_Songs.createMany({
          data: missingId?.map((id) => ({
            playlist_id: playlistId,
            song_id: id,
          }),
          ),
          skipDuplicates:true
        });
        
        if(songIds.length == missingId.length){
          return returnObjectFunction(true, "Songs successfully inserted in playlists...",data );
        }
        else{
          return returnObjectFunction(true, `Songs are inserted by neglecting ${songData.result} as they are already inserted`)
        }
      }
    } else {
     return returnObjectFunction(false,songData.message);
    }
  } catch (error) {
    logger.error(error)
    return returnObjectFunction(false, (error as Error).name);
  }
};

export {
  insertUserData,
  insertArtistData,
  insertAlbumData,
  insertSongData,
  insertPlaylistData,
  insertSongInPlaylist
};
