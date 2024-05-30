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

       await  prisma.genres.createMany({
            data: [
              { name: "Indie" },
              { name: "Romance" },
              { name: "BollyWood" },
              { name: "Tamil" },
              { name: "Gujarati" },
              { name: "Hip Hop" },
              { name: "Jazz" },
              { name: "Electronic" },
            ],
            skipDuplicates: true, // It's Skip duplicate value in table
          });

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