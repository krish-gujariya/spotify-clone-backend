
//Interface for user data
interface IUserData {
    name:string,
    email:string,
    password:string,
    dob:string
}


// Interface for admin Data
interface IArtistData {
    name:string,
    genre:internal,
}

// Fetched Genre Interface 
interface IGenres {
    name:string,
    id:number,
    created_at:Date,
    updated_at:Date
}





export {IUserData, IArtistData,IGenres }