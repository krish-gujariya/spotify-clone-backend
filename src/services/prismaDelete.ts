import { PrismaClient } from "@prisma/client";
import { genPassword, returnObjectFunction } from "../utils/usefullFunction";
import { logger } from "../utils/pino";
import { IArtistData, IGenres, IUserData } from "../types/generalInterface";

const prisma = new PrismaClient();

// Delete record from User Table

const deleteUser = async (id: number) => {
  try {
    await prisma.users.update({
      where:{
        id:id,
        deleted_at:null
      },
      data:{
        deleted_at:new Date()
      }
    })
    return { success: true };
  } catch (error) {
    logger.error((error as Error).message )
    return { success: false };
  }
};

const deleteFollowerRecord = async(user_id:number, artist_id:number)=>{

  try {
    const artist = await prisma.artists.findFirst({where:{id:artist_id},select:{name:true}});
    const followedArtist = await prisma.followers.findFirst({where:{artist_id:artist_id, user_id:user_id}});

    if(artist?.name){
      if(followedArtist?.artist_id){
        await prisma.followers.delete({
          where:
            {user_id_artist_id:{artist_id:artist_id, user_id:user_id}}
        })
        return returnObjectFunction(true,`${artist.name} unfollowed SuccessFully...`)
      }
      else{
        return returnObjectFunction(false, `Data for delete record not found...`);
      }
    }
    else{
      return returnObjectFunction(false,`No artists found...`)
    }

    
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).message);
  }
}

const deleteLikeRecord = async(user_id:number, songs_id:number) =>{
  try {
    const songs = await prisma.songs.findFirst({where:{id:songs_id}});
    const likedSong = await prisma.likes.findFirst({where:{song_id:songs_id, user_id:user_id}});

    if(songs?.id){
        if(likedSong?.song_id){
          await prisma.likes.delete({where:{user_id_song_id:{user_id:user_id, song_id:songs_id}}});
          return returnObjectFunction(true, `${songs.name} is unliked Successfully...`);
        }else{
          return returnObjectFunction(false, `Record for deleting doesnt exists... `);

        }
    }else{
      return returnObjectFunction(false, `No Song Found...`)
    }
  } catch (error) {
    logger.error(error);
    return returnObjectFunction(false, (error as Error).name);
  }
}

export {deleteUser, deleteFollowerRecord ,  deleteLikeRecord}