import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import {  IAlbumData, IArtistData, ISongInsertdata, IUserData } from "../types/generalInterface";
import { genPassword } from "../utils/usefullFunction";

const prisma = new PrismaClient();

// Insert into user Table

const insertUserData = async (
  userData: IUserData
): Promise<{ success: boolean }> => {
  const date = new Date(userData.dob);
  userData.dob = date
  try {
    await prisma.users.create({
      data: userData,
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

// Inset into artist table

const insertArtistData = async (
 artistData:IArtistData
): Promise<{ success: boolean }> => {

  try {
    await prisma.artists.create({
      data:artistData,
    });
    return { success: true };
  } catch (error) {
    logger.error(error);

    return { success: false };
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

const insertAlbumData = async (albumData:IAlbumData) => {
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

const insertSongData = async (
  songObject:ISongInsertdata
) => {
  try {
    await prisma.songs.create({
      data:songObject,
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

export { insertUserData, insertArtistData, insertAlbumData, insertSongData };
