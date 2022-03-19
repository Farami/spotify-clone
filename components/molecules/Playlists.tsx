import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import useStore from '../../store/useStore';
import Placeholder from '../atoms/Placeholder';

function Playlists() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
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

  return !playlists ? (
    <Placeholder count={20} />
  ) : (
    <>
      {playlists.map((playlist) => (
        <p
          key={playlist.id}
          className={classnames('cursor-pointer hover:text-white', {
            'text-white': playlist.id === playlistId,
          })}
          onClick={() => setPlaylistId(playlist.id)}
        >
          {playlist.name}
        </p>
      ))}
    </>
  );
}

export default Playlists;
