import { StoreSlice } from '../types/zustand';

type SongSlice = {
  currentTrackId: string | null;
  setCurrentTrackId: (id: string | null) => void;

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

const createSongSlice: StoreSlice<SongSlice> = (set, get) => ({
  currentTrackId: null,
  isPlaying: false,

  setCurrentTrackId: (id: string | null) => set(() => ({ currentTrackId: id })),
  setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
});

export default createSongSlice;
