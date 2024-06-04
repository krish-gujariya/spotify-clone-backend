import { Request, Response } from "express";
import {
    fetchAlbumData,
    fetchAllGenres,
    fetchAllSongData,
    fetchArtistData,
    fetchLikedSongs,
    fetchPlaylists,
    fetchUserData,
    showFollowers,
  } from "../services/prismaRead";
import { fetchResponseFunc } from "../utils/usefullFunction";
import { reducedPlaylistSongObject, reducedSongTotalListener, reduceFollowers, reducingPlaydeSongs } from "./reduceObject";
import { IReqQuerryId } from "../types/generalInterface";


const showFetchedGenres = async (req: Request, res: Response) => {
    const data = await fetchAllGenres();
    fetchResponseFunc(res, data);
  };
  
  const showFetcheUser = async (req: Request, res: Response) => {
    const id = req.body.id;
    const data = await fetchUserData(id);
    fetchResponseFunc(res, data);
  };
  
  const showFetchArtist = async (req: Request, res: Response) => {
    const data = await fetchArtistData();
    fetchResponseFunc(res, data);
  };
  
  const showAlbumData = async (req: Request, res: Response) => {
    const data = await fetchAlbumData();
    fetchResponseFunc(res, data);
  };
  
  const showSongsData = async (req: Request, res: Response) => {
    const data = await fetchAllSongData();
    fetchResponseFunc(res, data);
  };
  
  const showPlayedSongData = async (req: Request, res: Response) => {
    const {id}:IReqQuerryId = req.query as IReqQuerryId
    const data = await reducingPlaydeSongs(parseInt(id));
    fetchResponseFunc(res, data);
  };
  
  const showTotalSongListen = async (req: Request, res: Response) => {
    const data = await reducedSongTotalListener();
    fetchResponseFunc(res, data, data.message);
  }
  
  const showLikedSongData = async (req: Request, res: Response) => {
    const {id}:IReqQuerryId = req.query as IReqQuerryId
    const data = await fetchLikedSongs(parseInt(id));
    fetchResponseFunc(res, data, data.message);
  };
  
  const showPlaylistsData = async (req: Request, res: Response) => {
    const {id}:IReqQuerryId = req.query as IReqQuerryId ;
      const data = await fetchPlaylists(parseInt(id));
      fetchResponseFunc(res, data, data.message);
  };
  
  const showSongsOfPlaylist =  async (req: Request, res: Response) => {
    const name:string = req.query.name as string ;
    const data = await reducedPlaylistSongObject(name);
    fetchResponseFunc(res, data, data.message);
  };
  
  const showFollowersList = async (req: Request, res: Response) => {
    const name:string = req.query.name as string ;
    const data = await reduceFollowers(name);
    fetchResponseFunc(res, data, data.message);
  };


  export{
    showFetchedGenres,
  showFetcheUser,
  showFetchArtist,
  showAlbumData,
  showSongsData,
  showPlayedSongData,
  showLikedSongData,
  showPlaylistsData,
  showSongsOfPlaylist,
  showTotalSongListen,
  showFollowersList
  }