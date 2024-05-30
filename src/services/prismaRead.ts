import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/pino";
import {  IGenres } from "../types/generalInterface";

const prisma = new PrismaClient();


// user fetched data interface
interface  IUserFetchedData {
  name:string,
  email:string,
  dob:Date|null
}

// artist fetched data interface
interface IArtistFetchedData {
  name:string,
  genre:number,
  created_at:Date
}

const readUserUniqueData = async():Promise<void>=>{
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
  
      
    } catch (error) {
      logger.error(error)
    }
  }
  readUserUniqueData();



  // Read user Data
  const fetchUserData = async(id:number):Promise<{success:boolean, result:IUserFetchedData|null}> =>{
    try {
        const result = await prisma.users.findFirst({
            where:{
                id:id
            },
            select:{
                name:true,
                email:true,
                dob:true
            }
        
        })
        return {success:true, result:result}
    } catch (error) {
        return{success:false, result:null}
    }
  }


  // Fetch genre data

  
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


  // Read Artist table
  const fetchArtistData = async():Promise<{success:boolean, result:IArtistFetchedData[]|null}> =>{
    try {
        const result = await prisma.artists.findMany({
            select:{
                name:true,
                genre:true,
                created_at:true,            
            }
        })
        return {success:true, result:result}        
      } catch (error) {
        logger.error(error)
        return {success:true, result:null}        
    }
  }


  const fetchAlbumData = async() =>{
    try {
          const result = await prisma.albums.findMany({
            select:{
              name:true,
              release_date:true,
              songs:{
                select:{
                  name:true,
                  genres:{
                    select:{
                      name:true
                       
                    } 
                  }
                }
              },
              artist:{
                select:{
                  name:true,
                  id:true
                }
              }
            }
          })      
          return {result:result, success:true}
        } catch (error) {
          return {result:null, success:false}
          
    }
  }


  const fetchAllSongData = async() =>{
    try {
      const result =await prisma.songs.findMany({
        select:{
          name:true,
          duration:true,
          genres:{
            select:{
              name:true
            }
          },
          artist:{
            select:{
              name:true
            }
          },
          albums:{
            select:{
              name:true
            }
          }
        }
      })
      return {success:true, result:result}
    } catch (error) {
      return {success:false, result:null}
      
    }
  }

  export {fetchAllGenres, fetchUserData, fetchArtistData, fetchAlbumData, fetchAllSongData}