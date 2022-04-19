import FastAverageColor from 'fast-average-color';
import { shuffle } from 'lodash';
import { useState, useEffect } from 'react';
import useSpotify from '../../hooks/useSpotify';
import blobToBase64 from '../../lib/blob';
import useStore from '../../store/useStore';
import Placeholder from '../atoms/Placeholder';

// TODO extract from current playlist image
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const fac = new FastAverageColor();

function PlaylistHeader() {
  const spotifyApi = useSpotify();
  const playlistId = useStore((state) => state.playlistId);

  const [color, setColor] = useState<string | null>(null);
  const [playlist, setPlaylist] = useStore((state) => [
    state.playlist,
    state.setPlaylist,
  ]);

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) {
      return;
    }

    spotifyApi.getPlaylist(playlistId).then(setPlaylist);
  }, [spotifyApi, spotifyApi.getAccessToken(), playlistId]);

  useEffect(() => {
    if (!playlist) {
      setColor(shuffle(colors)[0]);
      return;
    }

    const image = playlist.images?.[0];
    if (!image) {
      setColor(shuffle(colors)[0]);
      return;
    }

    fetch(image.url)
      .then((x) => x.blob())
      .then(blobToBase64)
      .then(fac.getColorAsync)
      .then((x) => setColor(x.rgb));
  }, [playlist]);

  if (!playlist) {
    return <Placeholder />;
  }

  return (
    <section
      className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
    >
      <img
        className="h-44 w-44 shadow-2xl"
        src={playlist.images?.[0]?.url}
        alt=""
      />
      <div>
        <p>PLAYLIST</p>
        <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
          {playlist.name}
        </h1>
      </div>
    </section>
  );
}

export default PlaylistHeader;
