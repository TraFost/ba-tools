export interface ITrack {
  title: string;
  src: string;
  id: string;
  artist: string;
  image: string;
}

export interface IAlbum {
  id: number;
  title: string;
  image: string;
  tracks: ITrack[];
}
