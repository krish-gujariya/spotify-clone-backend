import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { logger } from "../../src/utils/pino";
import { genPassword } from "../../src/utils/usefullFunction";


const prisma = new PrismaClient();

const main = async () => {
    try {
         await prisma.users.upsert({
            where:{email:"krish@gmail.com"},
            update:{},
            create:{
                    email:"krish@gmail.com",
                    name:"Krish Gujariya",
                    password: await genPassword("mypassword1"),
                    dob: new Date("12-03-2003"),
            }
        })

        await prisma.genres.upsert({
            where:{id:1},
            update:{},
            create:{
                id:1,
                name:'Indie',
            }
        })

        await prisma.artists.upsert({
            where:{id:1},
            update:{},
            create:{
                name: "Rochak Kohli",
                genre:1,
            }   
            
        })

    } catch (error) {
        logger.info(error);
        
    }
}

main();