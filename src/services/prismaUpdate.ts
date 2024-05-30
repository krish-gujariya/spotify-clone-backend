import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import { genPassword } from "../utils/usefullFunction";

const prisma = new PrismaClient();

const updateUser = async (name: string, id: number) => {
  try {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

const updateArtist = async (name: string, id: number) => {
  try {
    await prisma.artists.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

const updateAlbum = async (name: string, id: number, artistId: number) => {
  try {
    await prisma.albums.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        artist_id: artistId,
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

const updateSong = async (name: string, id: number) => {
  try {
    await prisma.songs.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

export { updateAlbum, updateArtist, updateSong, updateUser };
