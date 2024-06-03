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


const checkForPlayedSongs = async(user_id:number, song_ids:number[]) =>{

  try {
    const user = await prisma.users.findFirst({where:{id:user_id}});
    const data = await prisma.songs.findMany({
      where:{
        id:{
          in:song_ids
        }
      },
      select:{
        id:true
      }
    })
    if(data.length==0  ){
      return returnObjectFunction(false,"Songs doesnt exists...")
    }
    else if(!user?.name){
      return returnObjectFunction(false, "User doesnt exists...")
    }
  
    else{
      const firstObj:{songid: number[]} = {
        songid :[]
      }
      const songIds = data.reduce((prev,curr)=>{
        prev.songid.push(curr.id);
        return prev;
      }, firstObj);
  
      const missingIds = song_ids.filter( (id)=> !songIds.songid.includes(id) );
      
      const result = await prisma.played_songs.findMany({
        where:{
          AND:[
            {user_id:user_id},{song_id:{in:songIds.songid}}
          ]
          },
      });
  
      if(result.length == 0 && missingIds.length != 0){
  
        return returnObjectFunction(true , `Record inserted Successfully by neglecting ${missingIds} as song of that id doesnt exist`, songIds.songid)
      }
      else if(result.length ==0){
        return returnObjectFunction(true , `Record inserted Successfully `, songIds.songid)
        
      }
      else{
        const playedSongid = result.reduce((prev:number[],curr)=>{
            prev.push(curr.song_id)
          return prev
        },[]);
  
        await prisma.played_songs.updateMany({where:{song_id:{in:playedSongid}},data:{count:{increment:1}}});
  
        const missingplayedSong = songIds.songid.filter((id)=> !playedSongid.includes(id));
 
        return returnObjectFunction(true, `Record inserted Successfully by increment count of song_id ${playedSongid}`,missingplayedSong )
        
      }
    }
    
  } catch (error) {
    return returnObjectFunction(false, (error as Error).message);
  }


}


export { checkForUserAlreadyExist, artistCheck, userExistBasedeOnId, fetchSongsFromPlaylists, checkForPlayedSongs };
