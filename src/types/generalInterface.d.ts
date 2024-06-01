
//Interface for user data
interface IUserData {
    name:string,
    email:string,
    password:string,
    dob:Date
}


// Interface for admin Data
interface IArtistData {
    name:string,
    email:string,
    password:string
}

// Fetched Genre Interface 
interface IGenres {
    name:string,
    id:number,
    created_at:Date,
    updated_at:Date
}



// Song data interface
interface ISongInsertdata {
    artist_id: number[];
    genre_id: number;
    album_id?: number ;
    duration: number;
    name: string;
  }
  

// Album data interface
interface IAlbumData {
    artist_id: number;
    release_date: Date;
    name: string;
  }
  

  type IReqQuerryId = {
    id:string
  }


export {IUserData, IArtistData,IGenres, ISongInsertdata , IAlbumData, IReqQuerryId}