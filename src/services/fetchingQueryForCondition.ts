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

    const songs  = await prisma.songs.findMany({where:{id:{in:songIds}}});
    const playlist = await prisma.playlists.findFirst({where:{id:playlistId}});

    if(!playlist?.name){
      return returnObjectFunction(false,`Playlist doesn't extists..`);
    }
    else if(songs.length == 0){
      return returnObjectFunction(false, `Songs doesn't exists...`);
    }
    else{
      const songsIds = songs.reduce((prev:number[],curr)=>{
        prev.push(curr.id);
        return prev;
      },[]);
      
      const missingSongId = songIds.filter((id)=>!songsIds.includes(id));

      const playlistSongs = await prisma.playlist_Songs.findMany({
        where:{
          AND:[ {playlist_id:playlistId}, {song_id:{in:songsIds}}]
        }
      });

      if(missingSongId.length!=0 && playlistSongs.length==0 ){
        return returnObjectFunction(true, `Playlist songs inserted successfully by neglecting ${missingSongId} as songs of that id doesnt exist... `, songsIds);
      }
      else if(playlistSongs.length ==0){
        return returnObjectFunction(true, `Playlist songs inserted successfully... `, songsIds);
      }
      
      else{
        const playlistSongId =playlistSongs.reduce((prev:number[],curr)=>{prev.push(curr.song_id); return prev; }, [])
        const missingPlaylistSong = songIds.filter((id)=>!playlistSongId.includes(id));

        if(missingPlaylistSong.length==0){
          return returnObjectFunction(false, `Songs already exists in playlsit...` );
        }
        else if(missingPlaylistSong.length == songIds.length){
          return returnObjectFunction(true,`Playlist songs inserted successfully...`, missingPlaylistSong );
        }
        else{
          return returnObjectFunction(true,`Playlist songs inserted successfully by neglecting ${playlistSongId} as they are already exists in playlists...`, missingPlaylistSong );
        }
      }

    }

  } catch (error) {
    
  }
};

const checkForPlayedSongs = async (user_id: number, song_ids: number[]) => {
  try {
    const user = await prisma.users.findFirst({ where: { id: user_id } });
    const data = await prisma.songs.findMany({
      where: {
        id: {
          in: song_ids,
        },
      },
      select: {
        id: true,
      },
    });
    if (data.length == 0) {
      return returnObjectFunction(false, "Songs doesnt exists...");
    } else if (!user?.name) {
      return returnObjectFunction(false, "User doesnt exists...");
    } else {
      const firstObj: { songid: number[] } = {
        songid: [],
      };
      const songIds = data.reduce((prev, curr) => {
        prev.songid.push(curr.id);
        return prev;
      }, firstObj);

      const missingIds = song_ids.filter((id) => !songIds.songid.includes(id));

      const result = await prisma.played_songs.findMany({
        where: {
          AND: [{ user_id: user_id }, { song_id: { in: songIds.songid } }],
        },
      });

      if (result.length == 0 && missingIds.length != 0) {
        return returnObjectFunction(
          true,
          `Record inserted Successfully by neglecting ${missingIds} as song of that id doesnt exist`,
          songIds.songid
        );
      } else if (result.length == 0) {
        return returnObjectFunction(
          true,
          `Record inserted Successfully `,
          songIds.songid
        );
      } else {
        const playedSongid = result.reduce((prev: number[], curr) => {
          prev.push(curr.song_id);
          return prev;
        }, []);

        await prisma.played_songs.updateMany({
          where: { song_id: { in: playedSongid } },
          data: { count: { increment: 1 } },
        });

        const missingplayedSong = songIds.songid.filter(
          (id) => !playedSongid.includes(id)
        );

        return returnObjectFunction(
          true,
          `Record inserted Successfully by increment count of song_id ${playedSongid}`,
          missingplayedSong
        );
      }
    }
  } catch (error) {
    return returnObjectFunction(false, (error as Error).message);
  }
};

const checkForArtists = async(user_id:number, artist_id:number[]) =>{

  try {

    const user = await prisma.users.findFirst({ where: { id: user_id } });
    const artists = await prisma.artists.findMany({where:{id:{in:artist_id}}});
    
    if(!user?.name){
      return returnObjectFunction(false, "User doesnt exists...")
    }
    else if(artists.length ==0){
      return returnObjectFunction(false, "Artists doesnt exists...")
    }
    else{

      const artistIds = artists.reduce((prev:number[],curr)=>{
        prev.push(curr.id);
        return prev;
      },[]);
      
      const missingids = artist_id.filter((id)=> !artistIds.includes(id));
      
      const followers = await prisma.followers.findMany({
        where:{
          AND:[{artist_id:{in:artistIds}}, {user_id:user_id}]
        }
      });
      
      if(followers.length == 0 && missingids.length != 0 ){
        return returnObjectFunction(true, `Followers added successfully by neglecting ${missingids} as those artists did'nt exist`, artistIds);
      }
      else if(followers.length == 0){
        return returnObjectFunction(true, `Followers added successfully `, artistIds);
      }
      else{
        const followerId = followers.reduce((prev:number[],curr)=>{
          prev.push(curr.artist_id);
          return prev;
        }, []);

        const missingFollowerId = artistIds.filter((id)=> !followerId.includes(id));
        if(missingFollowerId.length ==0){
          return returnObjectFunction(false, 'Artist already exists' )
        }
        else{
          return returnObjectFunction(true, `Artist followed successfully by neglecting ${followerId}s as they are already followed`,missingFollowerId );
        }
      }
    }
  } catch (error) {
    
  }
    

}

const checkLikedSong = async(user_id:number, songs_ids:number[]) =>{
  try {

    const user = await prisma.users.findFirst({where:{id:user_id}});
    const songs = await prisma.songs.findMany({where:{id:{in:songs_ids}}});

    if(songs.length ==0){ return returnObjectFunction(false, 'Songs doesnt exists...')}
    else if(!user?.id){return returnObjectFunction(false, `User doesn't exists...`)}
    else{
      const songIdArray = songs.reduce((prev:number[],curr)=> {prev.push(curr.id); return prev;},[]);
      const missingSongIdArray = songs_ids.filter((id)=> !songIdArray.includes(id));

      const playedSongsId = await prisma.likes.findMany({where:{
        AND:[{user_id:user_id}, {song_id:{in:songIdArray}}]
      }});
      
      if(playedSongsId.length==0 && missingSongIdArray.length==0){
        return returnObjectFunction(true, `Liked Songs data successfully inserted...`, songIdArray)
      }
      else if(playedSongsId.length==0 && missingSongIdArray.length != 0)  {
        return returnObjectFunction(true, `Record are inserted by neglecting ${missingSongIdArray} as this id song does'nt exist`, songIdArray);
      }
      else{
        const playedSongIdArray = playedSongsId.reduce((prev:number[],curr)=>{prev.push(curr.song_id); return prev;},[])
        const missingPlayedSongs =songIdArray.filter((id)=>!playedSongIdArray.includes(id));

          if(missingPlayedSongs.length ==0){
            return returnObjectFunction(false, 'Songs are already liked...');
          }
          else{
            return returnObjectFunction(true, `Songs are liked by neglecting ${playedSongIdArray} as they are already liked`, missingPlayedSongs);
          }
      }      
    }
  } catch (error) {
    return returnObjectFunction(false, (error as Error).name);
  }
}

export {
  checkForUserAlreadyExist,
  artistCheck,
  userExistBasedeOnId,
  fetchSongsFromPlaylists,
  checkForPlayedSongs,
  checkForArtists,
  checkLikedSong
};
