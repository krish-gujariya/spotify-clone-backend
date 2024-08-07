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
) => {
  try {
    const result = await prisma.users.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        dob: true,
        followers:{
          select:{
            artists:{select:{name:true}}
          }
        },
        playlists:{select:{name:true}}
      },
    });
    return { success: true, result: result };
  } catch (error) {
    return { success: false,message:(error as Error).name, result: null };
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
const fetchArtistData = async (id: number) => {
  try {
    const artists = await prisma.artists.findFirst({
      where: { id: id },
      select: {
        name: true,
      },
    });
    if (artists?.name) {
      return {success:true, message:`${artists.name} data retrived successfully...`, result:artists}
    } else {
      return {success:false, message:`Artist doesn't found...`}
    }
  } catch (error) {
    logger.error(error);
    return {success:false, message:(error as Error).name}
  }
};

const fetchAlbumData = async (id: number) => {
  try {
    const result = await prisma.albums.findFirst({
      where: { id: id },
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
            plays:true,
            duration: true,
            artists_songs:{
              select:{
              artists:{
                select:{
                  name:true
                }
              }
              }
            }
          },
          orderBy:{plays:"desc"}
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

const fetchPlayedSong = async (id: number) => {
  try {
    const result = await prisma.played_songs.findMany({
      select: {
        users: {
          select: {
            id: true,
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
          select: { name: true, id: true },
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

const songsTotalListener = async (data: object) => {
  try {
    const result = await prisma.songs.findMany({
    where:data ,
      select: {
        name: true,
        duration: true,
        plays:true
      },
      orderBy:{plays:'desc'}
    });
    
    return {
      success: true,
      message: `Songs listen ${recordMessafeSuccess}`,
      result: result,
    };
  } catch (error) {
    logger.error(error);
    return { success: true, message: (error as Error).name };
  }
};

const showFollowers = async (name: string) => {
  try {
    const data = await prisma.followers.findMany({
      where: { artists: { name: { contains: name } } },
      select: {
        artists: { select: { name: true, id: true } },
        users: { select: { name: true } },
      },
    });
    if (data.length == 0) {
      return returnObjectFunction(false, "Followers not found...");
    } else {
      return returnObjectFunction(
        true,
        `Follower Retrived successfully....`,
        data
      );
    }
  } catch (error) {
    return returnObjectFunction(false, (error as Error).message);
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
  showFollowers,
};

// Difference between include and select

// Select -> select only those field whose field are mentioned in select object.

// Include -> select all field of current table and field of relational table .

// In  Include only relational table name can be specified, not filed of current table.

// In select we can specifiy both reltational table anme as well as field can be specified.
