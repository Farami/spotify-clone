import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import useStore from '../../store/useStore';
import IconButton from '../atoms/IconButton';
import Placeholder from '../atoms/Placeholder';

// TODO highlight currently selected

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >(null);
  const [playlistId, setPlaylistId] = useStore((state) => [
    state.playlistId,
    state.setPlaylistId,
  ]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (spotifyApi.getAccessToken()) {
        setPlaylists(await spotifyApi.getUserPlaylists());
      }
    };

    fetchPlaylists();
  }, [session, spotifyApi]);

  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <IconButton icon={HomeIcon} text="Home" />
        <IconButton icon={SearchIcon} text="Search" />
        <IconButton icon={LibraryIcon} text="Your Library" />
        <hr className="border-t-[0.1px] border-gray-900" />

        <IconButton icon={PlusCircleIcon} text="Create Playlist" />
        <IconButton icon={HeartIcon} text="Liked Songs" />
        <IconButton icon={RssIcon} text="Your Episodes" />
        <hr className="border-t-[0.1px] border-gray-900" />

        {!playlists ? (
          <Placeholder count={20} />
        ) : (
          playlists.map((playlist) => (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white"
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
