import classnames from 'classnames';
import React from 'react';
import usePlaylists from '../../hooks/usePlaylists';
import useStore from '../../store/useStore';
import Placeholder from '../atoms/Placeholder';

function Playlists() {
  const { playlists, isLoading } = usePlaylists();
  const [playlistId, setPlaylistId] = useStore((state) => [
    state.playlistId,
    state.setPlaylistId,
  ]);

  return isLoading ? (
    <Placeholder count={20} />
  ) : (
    <>
      {playlists.map((playlist) => (
        <p
          title={playlist.name}
          key={playlist.id}
          className={classnames('cursor-pointer truncate hover:text-white', {
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
