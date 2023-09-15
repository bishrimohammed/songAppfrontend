import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { songType, StatisticsType, SongsState } from "../types/Song.type";
import rootSaga from "../components/root-saga";

const initialState: SongsState = {
  songs: [],
  filtedSongs: [],
  songStatistics: {
    Allstatistics: {
      totalSongs: 0,
      totalGenres: 0,
      totalArtists: 0,
      totalAlbum: 0,
    },
    Number_of_Song_genreStatistics: [],
    Number_song_and_albumartistStatistics: [],
    Number_songs_albumStatistics: [],
  },
  isLoadingSongsStatistics: false,
  isLoadingSongs: false,
  isAddNewsongStart: false,
  updateStart: false,
  isDeletesongStrrt: false,
};
const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchStart(state) {
      state.isLoadingSongs = true;
      console.log(state.isLoadingSongs);
    },
    addSongs(state: SongsState, action: PayloadAction<songType>) {
      state.songs = action.payload;
      state.filtedSongs.push(action.payload);
      state.isLoadingSongs = false;
    },
    fetchSongStatisticsStart(state) {
      state.isLoadingSongsStatistics = true;
    },
    setSongStatistics(state, action: PayloadAction<StatisticsType>) {
      state.isLoadingSongsStatistics = false;
      state.songStatistics = action.payload;
    },
    addNewStart(state) {
      state.isAddNewsongStart = true;
    },
    addNewSong(state, action: PayloadAction<songType>) {
      console.log(action.payload);

      state.songs.unshift(action.payload);
      state.isAddNewsongStart = true;
    },
    updateStartStart(state, action: PayloadAction<songType>) {
      state.updateStart = true;
    },
    updateSong(state, action: PayloadAction<songType>) {
      state.updateStart = false;
      const songIndex = state.songs.findIndex((value) => {
        return value._id === action.payload._id;
      });
      console.log("updsate");
      state.songs[songIndex] = action.payload;
    },
    startDeleteSong(state) {
      state.isDeletesongStrrt = true;
    },
    deleteSong(state, action: PayloadAction<songType>) {
      console.log(action.payload._id);

      state.isDeletesongStrrt = false;
      state.songs = state.songs.filter(
        (song) => song._id !== action.payload._id
      );
      state.filtedSongs = state.filtedSongs.filter(
        (song) => song._id !== action.payload._id
      );
    },
    filterSong(state, action) {
      const isByArtist = action.payload.artist === "";
      const isByAlbum = action.payload.album === "";
      //isByGenre = action.payload.genre === "";
      if (isByArtist && isByAlbum) {
        state.filtedSongs = state.songs;
      } else if (isByArtist === false && isByAlbum === true) {
        state.filtedSongs = state.filtedSongs.filter(
          (song) => song.artist === action.payload.artist
        );
      } else if (isByArtist === true && isByAlbum === false) {
        state.filtedSongs = state.filtedSongs.filter(
          (song) => song.album === action.payload.album
        );
      } else {
        state.filtedSongs = state.filtedSongs.filter((song) => {
          return (
            song.album === action.payload.album &&
            song.artist === action.payload.artist
          );
        });
      }
      //state.filtedSongs = action.payload;
    },
  },
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: songSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
export const songActions = songSlice.actions;
sagaMiddleware.run(rootSaga);
export default store;
