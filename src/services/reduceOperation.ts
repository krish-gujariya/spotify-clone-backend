import { returnObjectFunction } from "../utils/usefullFunction";
import { fetchAlbumData, fetchArtistData, fetchUserData, songsTotalListener } from "./prismaRead"

// interface for songs contain array of artists.

interface IArtistArrayAccumulator {
    name:string,
    plays:number,
    duration:number,
    artists:string[]
}

const reduceAlbumObject = async(id:number)=>{

    const data = await fetchAlbumData(id);
    if(data.success ){
        let i =0;
        const totaltime = data.result?.songs.reduce((prev,curr)=>{
            i++; 
            prev +=  curr.duration*60;
            
            return prev
        }, 0) as number;
        
        const firstObj:IArtistArrayAccumulator[] =[];
        let init =0;
        const artists = data.result?.songs.reduce((prev,curr)=>{
            if(prev.length==0){
                const pushObj:IArtistArrayAccumulator ={
                    name:curr.name,
                    plays:curr.plays,
                    duration:curr.duration,
                    artists:[]
                }
                curr.artists_songs.forEach(element => {
                    pushObj.artists.push(element.artists.name)
                });
                prev.push(pushObj);
                console.log(prev[0]);
                
            }
            else if( curr.name == prev[init].name){
                curr.artists_songs.forEach(element => {
                    prev[init].artists.push(element.artists.name);
                });
            }
            else{
                const pushObj:IArtistArrayAccumulator ={
                    name:curr.name,
                    plays:curr.plays,
                    duration:curr.duration,
                    artists:[]
                }
                curr.artists_songs.forEach(element => {
                    pushObj.artists.push(element.artists.name)
                });
                prev.push(pushObj);
                init++;
            }
            return prev;
        }, firstObj)
        const result  ={
            name:data.result?.name,
            release_date:data.result?.release_date,
            total_songs:i,
            total_duration:(totaltime/60).toFixed(2),
            artist:data.result?.artist,
            songs:artists
        }
        return returnObjectFunction(true, `${result.name} album retrived Successfully...`, result);
    }
    else{
        return data;
    }
}


const reducedArtistData = async(id:number)=>{
    
    const artistData = await fetchArtistData(id);
    const songData = await songsTotalListener( {artists_songs:{every:{artist_id:id}}}) ;

    if(artistData.success && songData.success){
        const artistListner = songData.result?.reduce((prev,curr)=>{
            prev += curr.plays;
            return prev;
        }, 0);

        const result ={
            name:artistData.result?.name,
            totalListner:artistListner,
            songs:songData
        }

        return returnObjectFunction(true, artistData.message, result);
    }else{
        return returnObjectFunction(false, artistData.message)
    }
}

const reduceUserObject =async (id:number) => {
    const userData = await fetchUserData(id);
    if(userData.success){
        let followingCount =0;
        const followingArtist = userData.result?.followers.reduce((prev:string[],curr)=>{
            followingCount++;
            prev.push(curr.artists.name);
            return prev;
        },[]);
        let playlistCount = 0;
        const playlists = userData.result?.playlists.reduce((prev:string[],curr)=>{
            playlistCount++;
            prev.push(curr.name)
            return prev;
        },[]);

        const result = {
            name:userData.result?.name,
            email:userData.result?.email,
            dob:userData.result?.dob,
            totalFollowing:followingCount,
            following:followingArtist,
            totalPlaylist:playlistCount,
            playlists:playlists
        }    
        return returnObjectFunction(true, `${result.name} users data retrived Successfully...`, result);
    }else{
        return returnObjectFunction(false,userData.message );
    }
};

export {reduceAlbumObject, reducedArtistData,  reduceUserObject}