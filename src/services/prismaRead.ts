import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import { IAlbumData, IGenres } from "../types/generalInterface";
import { returnObjectFunction } from "../utils/usefullFunction";
import {
  recordMessafeSuccess,
  recordMessageFail,
} from "../utils/generalVariables";

const prisma = new PrismaClient();

// user fetched data interface
interface IUserFetchedData {
  name: string;
  email: string;
  dob: Date | null;
}

// album Interface data
interface IFetchedAlbum {
  name: string;
  release_date: Date;
}

// artist fetched data interface
interface IArtistFetchedData {
  name: string;
  created_at: Date;
  albums: IFetchedAlbum[];
}

const readUserUniqueData = async (): Promise<void> => {
  try {
    const result = await prisma.users.findUnique({
      where: {
        // FindUnique return single record which contain unique data and it find based on any of the unique identifier
        id: 1,
      },
      select: {
        email: true,
        dob: true,
        created_at: true,
        updated_at: true,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
readUserUniqueData();

// Read user Data
const fetchUserData = async (
  id: number
): Promise<{ success: boolean; result: IUserFetchedData | null }> => {
  try {
    const result = await prisma.users.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        dob: true,
      },
    });
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: null };
  }
};

// Fetch genre data

const fetchAllGenres = async (): Promise<{
  success: boolean;
  result: IGenres[] | null;
}> => {
  try {
    const data: IGenres[] = await prisma.genres.findMany({
      select: {
        name: true,
        id: true,
        created_at: true,
        updated_at: true,
      },
    });

    return { success: true, result: data };
  } catch (error) {
    logger.error(error);
    return { success: false, result: null };
  }
};

// Read Artist table
const fetchArtistData = async (): Promise<{
  success: boolean;
  result: IArtistFetchedData[] | null;
}> => {
  try {
    const result = await prisma.artists.findMany({
      select: {
        name: true,
        albums: {
          select: {
            name: true,
            release_date: true,
          },
        },
        created_at: true,
      },
    });
    return { success: true, result: result };
  } catch (error) {
    logger.error(error);
    return { success: true, result: null };
  }
};

const fetchAlbumData = async () => {
  try {
    const result = await prisma.albums.findMany({
      select: {
        name: true,
        release_date: true,
        artist: {
          select: {
            name: true,
          },
        },
        songs: {
          select: {
            name: true,
            duration: true,
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return { result: result, success: true };
  } catch (error) {
    return { result: null, success: false };
  }
};

const fetchAllSongData = async () => {
  try {
    const result = await prisma.songs.findMany({
      select: {
        name: true,
        duration: true,
        artists_songs: {
          select: {
            artists: {
              select: {
                name: true,
              },
            },
          },
        },
        likes: {
          select: {
            users: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: null };
  }
};

const fetchPlayedSong = async (id:number) => {
  try {
    const result = await prisma.played_songs.findMany({
      
      select: {
        
        users: {
          select: {
            id:true,
            name: true,
          },
        },
        songs: {
          select: {
            name: true,
          },
        },
        count: true,
      },
    });

    if (result.length == 0) {
      return returnObjectFunction(false, recordMessageFail);
    } else {
      return returnObjectFunction(
        true,
        `Played song ${recordMessafeSuccess}`,
        result
      );
    }
  } catch (error) {
    return returnObjectFunction(false, (error as Error).message);
  }
};

const fetchLikedSongs = async (id: number) => {
  try {
    const result = await prisma.users.findMany({
      where: {
        id: id,
      },
      select: {
        name: true,
        likes: {
          select: {
            songs: {
              select: {
                name: true,
                duration: true,
              },
            },
          },
        },
      },
    });
    if (result.length == 0) {
      return returnObjectFunction(false, "NO result Found...");
    } else {
      return returnObjectFunction(
        true,
        "Liked Songs retrived successfully...",
        result
      );
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message);
  }
};

const fetchPlaylists = async (id: number) => {
  try {
    const result = await prisma.playlists.findMany({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
    });
    return returnObjectFunction(
      true,
      "Playlist record fetched successfully...",
      result
    );
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, `${(error as Error).message}`, null);
  }
};

const fetchPlaylistSongs = async (name: string) => {
  try {
    const data = await prisma.playlist_Songs.findMany({
      where: {
        playlist: {
          name: {
            contains: name,
          },
        },
      },
      select: {
        playlist: {
          select: { name: true },
        },

        songs: {
          select: {
            name: true,
            duration: true,
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (data.length == 0) {
      return returnObjectFunction(false, "No playlist found...");
    } else {
      return returnObjectFunction(
        true,
        "Songs of playlist are successfully retrived...",
        data
      );
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(true, (error as Error).message);
  }
};

const songsTotalListener = async () => {
  try {
    const result = await prisma.songs.findMany({
      select: {
        name: true,
        duration: true,
        played_songs: {
          select: {
            count: true,
          },
        },
      },
    });
    return {success:true, message:`Songs listen ${recordMessafeSuccess}`, result:result}
  } catch (error) {
    logger.error(error);
    return {success:true, message:(error as Error).name}
  }
};



export {
  fetchAllGenres,
  fetchUserData,
  fetchArtistData,
  fetchAlbumData,
  fetchAllSongData,
  fetchPlayedSong,
  fetchLikedSongs,
  fetchPlaylists,
  fetchPlaylistSongs,
  songsTotalListener,
};

// Difference between include and select

// Select -> select only those field whose field are mentioned in select object.

// Include -> select all field of current table and field of relational table .

// In  Include only relational table name can be specified, not filed of current table.

// In select we can specifiy both reltational table anme as well as field can be specified.
