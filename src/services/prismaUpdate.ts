import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import { genPassword, returnObjectFunction } from "../utils/usefullFunction";

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
    return returnObjectFunction(true, 'User data updated successfully...')
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message);
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
    return returnObjectFunction(true, `Artists data updated successfully...`)
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message)
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
    return returnObjectFunction(true, `Albums data updated successfully...`)
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message)
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

    return returnObjectFunction(true, `Songs data updated successfully...`)
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message)
  }
};

export { updateAlbum, updateArtist, updateSong, updateUser };
