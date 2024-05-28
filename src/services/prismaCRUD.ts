import { PrismaClient } from "@prisma/client";
import { genPassword } from "../utils/usefullFunction";
import { logger } from "../utils/pino";
import { IArtistData, IGenres, IUserData } from "../types/generalInterface";

const prisma = new PrismaClient();

/*
* Prisma ORM - Create Operations
*/

// Inserting user data
const insertUserData = async (userData: IUserData):Promise<{success:boolean}> => {
  const date = new Date(userData.dob);

  try {
    await prisma.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: await genPassword(userData.password),
        dob: date,
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

//Inserting Artist data
const insertArtistData = async (artistData: IArtistData):Promise<{success:boolean}> => {
  try {
    await prisma.artists.create({
      data: {
        name: artistData.name,
        genre: artistData.genre,
      },
    });
    return { success: true };
  } catch (error) {
    logger.error(error);

    return { success: false };
  }
};


// Inserting Genres ++ Insert multiple record
const insertGenreData = async():Promise<{success:boolean}>=>{
    try {
        await prisma.genres.createMany({
            data:[
                {name:"Indie"},
                {name:"Romance"},
                {name:"BollyWood"},
                {name:"Tamil"},
                {name:"Gujarati"},
                {name:"Hip Hop"},
                {name:"Jazz"},
                {name:"Electronic"},
        ],
        skipDuplicates:true  // It's Skip duplicate value in table
        })
        return ({success:true})
    } catch (error) {
        logger.error(error);
        return {success:false}
    }
} 

insertGenreData();


/*
 * Prisma ORM -- Read Operation
 */

const readUserUniqueData = async()=>{
  try {
    const result = await prisma.users.findUnique({where:{       // FindUnique return single record which contain unique data and it find based on any of the unique identifier
      id:1
    },
    select:{
      email:true,
      dob:true,
      created_at:true,
      updated_at:true
    }
  })

    console.log(result);
    
  } catch (error) {
    logger.error(error)
  }
}
readUserUniqueData();



const fetchAllGenres =async():Promise<{success:boolean, result:IGenres[]|null}>=>{
  try {
    const data:IGenres[] = await prisma.genres.findMany({
      select:{
        name:true,
        id:true,
        created_at:true,
        updated_at:true
      }
    });
    
    return {success:true, result:data}

  } catch (error) {
    logger.error(error)
    return{success:false, result:null}
  }
}


/*
 * Prisma ORM -- Update Operations 
 */

// Updating record in users table
const updateUser = async()=>{
  try {
   let data = await prisma.users.update({
      where:{
        id:1
      },
      data:{
        name:"Krish Gujariya",
        dob:"2002-02-02"
      }
    })
    console.log(data);
    
  } catch (error) {
    logger.error(error);
  }
}

// updateUser();



/*

* Delete Operations

*/

const deleteRecords = async()=>{
  try {
    await prisma.users.delete({
      where :{
        id:1
      }
    })
    
  } catch (error) {
    logger.error(error);

  }
}

deleteRecords();
export { insertUserData, insertArtistData, fetchAllGenres };
