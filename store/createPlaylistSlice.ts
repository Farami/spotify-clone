import { StoreSlice } from '../types/zustand';

type PlaylistSlice = {
  playlistId: string;
  setPlaylistId: (id: string) => void;

  playlist: SpotifyApi.SinglePlaylistResponse | null;
  setPlaylist: (playlist: SpotifyApi.SinglePlaylistResponse) => void;
};

const createPlaylistSlice: StoreSlice<PlaylistSlice> = (set, get) => ({
  playlistId: '4LnTQT9pZuyXG96WS9RNzU',
  setPlaylistId: (id: string) => set(() => ({ playlistId: id })),

  playlist: null,
  setPlaylist: (playlist: SpotifyApi.SinglePlaylistResponse) =>
    set(() => ({ playlist })),
});

export default createPlaylistSlice;
