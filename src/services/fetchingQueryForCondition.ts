import { PrismaClient } from "@prisma/client";
import { returnObjectFunction } from "../utils/usefullFunction";
import { logger } from "../utils/pino";

const prisma = new PrismaClient();

const conditionCodeBlock = (message: string, name?: string) => {
  if (name) {
    return returnObjectFunction(false, message);
  } else {
    return returnObjectFunction(true);
  }
};

const checkForUserAlreadyExist = async (email: string) => {
  try {
    let data = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return conditionCodeBlock("User Already exists...", data?.name);
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message, null);
  }
};

const artistCheck = async (email: string) => {
  try {
    const data = await prisma.artists.findFirst({
      where: {
        email: email,
      },
      select: {
        name: true,
      },
    });

    return conditionCodeBlock("Artist already Exists...", data?.name);
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message, null);
  }
};

const userExistBasedeOnId = async (id: number) => {
  try {
    const data = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (data?.name) {
      return returnObjectFunction(true);
    } else {
      return returnObjectFunction(false, "UserId not Found...");
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message, null);
  }
};

const fetchSongsFromPlaylists = async (
  songIds: number[],
  playlistId: number
) => {
  try {
    const data = await prisma.playlist_Songs.findMany({
      where: {
        AND: [{ song_id: { in: songIds } }, { playlist_id: playlistId }],
      },
      select: {
        song_id: true,
      },
    });
    const firstObj: { id: number[] } = { id: [] };

    let songs: { id: number[] } = data.reduce((prev, cur) => {
      prev.id.push(cur.song_id);
      return prev;
    }, firstObj);

    return returnObjectFunction(true, "Songs fetched successfully...", songs.id)
    
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(true, "Songs fetched successfully...", null)
  }
};

export { checkForUserAlreadyExist, artistCheck, userExistBasedeOnId, fetchSongsFromPlaylists };
