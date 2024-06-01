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
  playlist_id: Joi.number().positive(),
  song_id : Joi.array().items(Joi.number().positive())
})

export {
  insertArtistSchema,
  insertUserSchema,
  insertAlbumSchema,
  insertSongSchema,
  commonValidationSchema,
  playlistSongsValidationSchema
};
