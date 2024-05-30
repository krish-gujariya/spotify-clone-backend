import { PrismaClient } from "@prisma/client";

import { logger } from "../../src/utils/pino";
import { genPassword } from "../../src/utils/usefullFunction";

const prisma = new PrismaClient();

const main = async () => {


  try {
    await prisma.users.upsert({
      where: { email: "krish@gmail.com" },
      update: {},
      create: {
        email: "krish@gmail.com",
        name: "Krish Gujariya",
        password: await genPassword("mypassword1"),
        dob: new Date("12-03-2003"),
        // followers:{
        //   createMany:{
        //     data:[
        //       {artist_id:1},
        //       {artist_id:3}
        //     ]
        //   }
        // },
        // likes:{
        //   createMany:{
        //     data:[
        //       {song_id:2},
        //       {song_id:4},
        //       {song_id:6},
        //     ]
        //   }
        // },
        // played_songs:{
        //   createMany:{
        //     data:[
        //       {song_id:1, count:3},
        //       {song_id:3, count:4},
        //       {song_id:2, count:9},
        //       {song_id:6, count:10},
        //       {song_id:7, count:1}
        //     ]
        //   }
        // },
        // playlists:{
        //   create:{name:"Relax", playlist_songs:{
        //     createMany:{
        //       data:[
        //         {song_id:2},
        //         {song_id:3},
        //         {song_id:4},
        //         {song_id:6},
        //         {song_id:7},
        //       ]
        //     }
        //   }}
        // }
      },
    });
    await prisma.users.upsert({
      where: { email: "jj@getMaxListeners.com" },
      update: {},
      create: {
        email: "jj@getMaxListeners.com",
        name: "Jasmin Jani",
        password: await genPassword("password1"),
        dob: new Date("03-12-2003"),
        // followers:{
        //   createMany:{
        //     data:[
        //       {artist_id:1},
        //       {artist_id:2},
        //       {artist_id:3},
        //       {artist_id:4},
        //     ],
        //   }
        // },
        // likes:{
        //   createMany:{
        //     data:[
        //       {song_id:1},
        //       {song_id:3},
        //       {song_id:4},
        //       {song_id:7},
        //     ],
        //     skipDuplicates:true
        //   }
        // },
        // played_songs:{
        //   createMany:{
        //     data:[
        //       {count:12,song_id:1},
        //       {count:10,song_id:7},
        //       {count:5,song_id:3},
        //       {count:3,song_id:2},
        //       {count:12,song_id:4},
        //     ],
        //     skipDuplicates:true
        //   }
        // },
        // playlists:{
        //   create:{name:"My PlayList1", playlist_songs:{
        //     createMany:{
        //       data:[
        //         {song_id:1},
        //         {song_id:2},
        //         {song_id:3},
        //         {song_id:4},
        //         {song_id:5},
        //         {song_id:6},
        //       ],
        //       skipDuplicates:true
        //     }
        //   }}
        // }
      },
    });

    await prisma.genres.createMany({
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
      skipDuplicates:true
    });

    await prisma.artists.createMany({
        data:[
          {name:"Pritam", email:"prtiam@gmail.com", password: await genPassword("asd") },
          {name:"Arjit Sinh", email:"arjit@gmail.com", password: await genPassword("asd1") },
          {name:"Tushar Joshi", email:"tushar@gmail.com", password: await genPassword("asd1") },
          {name:"Amitabh Bhattacharya", email:"ab@gmail.com", password: await genPassword("asd1")},
        ],
        skipDuplicates: true, // It's Skip duplicate value in table

    });
   
    
    await prisma.albums.upsert({
        where:{id:1},
        update:{},
        create:{
            id:1,
            name:"Jagga Jasoos",
            release_date:new Date("06-06-2017"),
            artist_id:1,
        
            songs:{
                create:
                    [
                        { duration:3.31, genre_id:2,name:"Ullu Ka Pattha" },
                        { duration:3.59, genre_id:2,name:"Jhumritalaiyya"},
                        { duration:3.23, genre_id:4,name:"Galti Se Mistake"},
                        { duration:4.13, genre_id:2,name:"Phir Wahi"},
                        { duration:4.42, genre_id:5,name:"Musafir"},
                        { duration:4.39, genre_id:5,name:"Khaana Khaake" },
                        { duration:3.45, genre_id:1,name:"Bad Lucky" },
                    ],

                
            }
        }
    })
    
    await prisma.artists_songs.createMany({
      data:[
        {artist_id:2, song_id:1},
        {artist_id:2, song_id:2},
        {artist_id:2, song_id:4},
        {artist_id:3, song_id:5},
        {artist_id:3, song_id:6},
        {artist_id:1, song_id:6},
        {artist_id:4, song_id:6},
        {artist_id:3, song_id:7},
        {artist_id:2, song_id:3},
      ],
      skipDuplicates:true,
    })

    

  } catch (error) {
    logger.info(error);
  }
};

main();
