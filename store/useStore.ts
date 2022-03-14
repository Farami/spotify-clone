import create from 'zustand';
import createPlaylistSlice from './createPlaylistSlice';
import createSongSlice from './createSongSlice';

const useStore = create((set, get) => ({
  ...createPlaylistSlice(set, get),
  ...createSongSlice(set, get),
}));

export default useStore;
