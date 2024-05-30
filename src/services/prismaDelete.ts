import { PrismaClient } from "@prisma/client";
import { genPassword } from "../utils/usefullFunction";
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

export {deleteUser}