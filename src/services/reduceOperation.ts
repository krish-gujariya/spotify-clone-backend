import { reducedSongTotalListener } from "../controllers/reduceObject";
import { returnObjectFunction } from "../utils/usefullFunction";
import { fetchAlbumData } from "./prismaRead"

const reduceAlbumObject = async(id:number)=>{

    const data = await fetchAlbumData(id);
    const songs = await reducedSongTotalListener({album_id:id})
    if(data.success && songs.success){
        let i =0;
        const totaltime = data.result?.songs.reduce((prev,curr)=>{
            i++; 
            prev +=  curr.duration*60;
            
            return prev
        }, 0) as number;
        
        const result  ={
            name:data.result?.name,
            release_date:data.result?.release_date,
            total_songs:i,
            total_duration:(totaltime/60).toFixed(2),
            artist:data.result?.artist,
            songs:songs.result
        }
        return returnObjectFunction(true, `${result.name} album retrived Successfully...`, result);
    }
    else{
        return data;
    }
}

export {reduceAlbumObject}