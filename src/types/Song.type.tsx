export type songType = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
};
export interface SongsState {
  songs: songType[];

  filtedSongs: songType[];
  songStatistics: StatisticsType;
  isLoadingSongsStatistics: boolean;
  isLoadingSongs: boolean;
  isAddNewsongStart: boolean;
  updateStart: boolean;
  isDeletesongStrrt: boolean;
}
type SongGenre = {
  _id: string;
  count: number;
};
type SongAlbumArtist = {
  _id: string;
  totalSongs: number;
  totalAlbums: number;
};
type SongAlbum = {
  _id: string;
  totalSongs: number;
};
export type StatisticsType = {
  Allstatistics: {
    totalSongs: number;
    totalGenres: number;
    totalArtists: number;
    totalAlbum: number;
  };
  Number_of_Song_genreStatistics: SongGenre[];
  Number_song_and_albumartistStatistics: SongAlbumArtist[];
  Number_songs_albumStatistics: SongAlbum[];
};
