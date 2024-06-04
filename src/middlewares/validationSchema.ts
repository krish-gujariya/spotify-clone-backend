import Joi from "joi";

// Insert User  Schema
const insertUserSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  dob: Joi.date().max("01-01-2005"),
});

//  Insert Artist validation Schema
const insertArtistSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

// Insert Album validation Schema
const insertAlbumSchema = Joi.object().keys({
  artist_id: Joi.number(),
  release_date: Joi.date(),
  name: Joi.string(),
});

// Insert Song Validation Schema
const insertSongSchema = Joi.object().keys({
  artist_id: Joi.array().items(Joi.number()),
  genre_id: Joi.number(),
  album_id: Joi.number(),
  duration: Joi.number().max(15),
  name: Joi.string(),
});

const commonValidationSchema = Joi.object().keys({
  name: Joi.string(),
  id: Joi.number().positive(),
  artistId: Joi.number().positive(),
  user_id: Joi.number().positive()
});


const playlistSongsValidationSchema = Joi.object().keys({

  id : Joi.number().required(),
  idArray : Joi.array().items(Joi.number().positive()).required()
})

// validation schema for artist_id and user_id
const userArtistIdValidationSchema = Joi.object().keys({
  user_id : Joi.number().positive().required(),
  artist_id : Joi.number().positive().required(),

})

//  validation schema for user_id and songs_id
const userSongsIdSchema = Joi.object().keys({
  user_id : Joi.number().positive().required(),
  song_id : Joi.number().positive().required(),
})

export {
  insertArtistSchema,
  insertUserSchema,
  insertAlbumSchema,
  insertSongSchema,
  commonValidationSchema,
  playlistSongsValidationSchema,
  userArtistIdValidationSchema,
  userSongsIdSchema
};
