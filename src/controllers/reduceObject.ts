import {
  fetchPlayedSong,
  fetchPlaylistSongs,
  showFollowers,
  songsTotalListener,
} from "../services/prismaRead";
import { logger } from "../utils/pino";
import { returnObjectFunction } from "../utils/usefullFunction";

// Fetche  song interface
interface IFetchedSong {
  songs: {
    name: string;
    duration: number;
    genres: {
      name: string;
    };
  };
}

// Interface for playlist song result
interface ISongsOfPlaylists {
  playlist: {
    name: string;
    id: number;
  };
  songs: IFetchedSong;
}

interface IAccumulator {
  playlist: {
    name: string;
    id: number;
  };

  songs: IFetchedSong[];
}

// genreated result interface
interface IResultPlaylists {
  success: boolean;
  message?: string;
  result: ISongsOfPlaylists[];
}

const reducedPlaylistSongObject = async (name: string) => {
  const data = (await fetchPlaylistSongs(name)) as IResultPlaylists;
  if (data.success) {
    const firstObj: IAccumulator[] = [
      {
        playlist: {
          name: data.result[0].playlist.name,
          id: data.result[0].playlist.id,
        },
        songs: [],
      },
    ];
    let i = 0;
    const result = data.result.reduce((prev, cur) => {
      if (prev[i].playlist.id == cur.playlist.id) {
        prev[i].songs.push(cur.songs);
      } else {
        const pushObj: IAccumulator = {
          playlist: cur.playlist,
          songs: [cur.songs],
        };
        prev.push(pushObj);
        i++;
      }

      return prev;
    }, firstObj);

    return returnObjectFunction(true, data.message, result);
  } else {
    return data;
  }
};

// Interface for fetchePlayed songs
interface IPlayedSongs {
  users: {
    name: string;
    id: number;
  };
  songs: {
    name: string;
  };
  count: number;
}

// Interface for data of fetched Played Songs.
interface IDataPlayedSong {
  success: boolean;
  message?: string;
  result: IPlayedSongs[];
}

interface INameCount {
  name: string;
  count: number;
}

interface IPlayedSongAccumulator {
  users: {
    name: string;
    id: number;
  };
  songs: INameCount[];
}

const reducingPlaydeSongs = async (id: number) => {
  const data = (await fetchPlayedSong(id)) as IDataPlayedSong;
  if (data.success) {
    const firstObj: IPlayedSongAccumulator[] = [
      {
        users: {
          name: data.result[0].users.name,
          id: data.result[0].users.id,
        },
        songs: [],
      },
    ];
    let i = 0;
    const result = data.result.reduce((prev, curr) => {
      if (prev[i].users.id == curr.users.id) {
        const pushObj = {
          name: curr.songs.name,
          count: curr.count,
        };
        prev[i].songs.push(pushObj);
      } else {
        const pushObj = {
          users: curr.users,
          songs: [{ name: curr.songs.name, count: curr.count }],
        };
        prev.push(pushObj);
        i++;
      }
      return prev;
    }, firstObj);

    return returnObjectFunction(true, data.message, result);
  } else {
    return data;
  }
};

// Accumulator for reduced song count object
export interface ISongPlayedRecord {
  name: string;
  duration: number;
  count: number;
}
// const reducedSongTotalListener = async(objectData:object)=>{
//   const data =await songsTotalListener(objectData);

//   if(data.success){
//     const firstObj:ISongPlayedRecord[]= []
//     const result = data.result?.reduce((prev,curr)=>{
//         let songCount = 0;
//         curr.played_songs.forEach(element => {
//             songCount += element.count
//         });

//       const pushObj = {
//         name:curr.name,
//         duration:curr.duration,
//         count:songCount
//       }
//       prev.push(pushObj);
//       return prev;
//     }, firstObj);

//     return returnObjectFunction(true, data.message, result)

//   }
//   else{
//     return returnObjectFunction(false, data.message)
//   }

// }

// Interface for reduced follower accumulator
interface IFollowerAccumulator {
  artist: {
    name: string;
    id: number;
    users: { name: string }[];
  };
}

// interface for data fetched from showFollower query.
interface IFetchFollowers {
  artists: {
    name: string;
    id: number;
  };
  users: {
    name: string;
  };
}

// Result format interface
interface IResultFollowers {
  success: boolean;
  message?: string;
  result: IFetchFollowers[];
}
const reduceFollowers = async (name: string) => {
  const data = (await showFollowers(name)) as IResultFollowers;
  if (data.success) {
    const firstObj: IFollowerAccumulator[] = [
      {
        artist: {
          name: data.result[0].artists.name,
          id: data.result[0].artists.id,
          users: [],
        },
      },
    ];
    let i = 0;
    const result = data.result?.reduce((prev, cur) => {
      if (cur.artists.id == prev[i].artist.id) {
        prev[i].artist.users.push(cur.users);
      } else {
        const pushObj = {
          artist: {
            name: cur.artists.name,
            id: cur.artists.id,
            users: [cur.users],
          },
        };
        prev.push(pushObj);
        i++;
      }
      return prev;
    }, firstObj);

    return returnObjectFunction(true, data.message, result);
  } else {
    return data;
  }
};
export {
  reducedPlaylistSongObject,
  reducingPlaydeSongs,
  // reducedSongTotalListener,
  reduceFollowers,
};
