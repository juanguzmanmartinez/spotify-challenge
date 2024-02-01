export interface IArtist {
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: null;
    total: number;
  };
  genres?: string[];
  href: string;
  id: string;
  images?: IImage[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}
export interface ITrack {
  album: IAlbum;
  artists: IArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface IAlbum {
  album_group?: string;
  album_type?: string;
  artists?: IArtist[];
  external_urls?: {
    spotify: string;
  };
  href?: string;
  id?: string;
  images: IImage[];
  is_playable?: true;
  name: string;
  release_date: string;
  release_date_precision?: string;
  total_tracks?: number;
  type?: string;
  uri?: string;
}
interface IImage {
  height?: number;
  url?: string;
  width?: number;
}
