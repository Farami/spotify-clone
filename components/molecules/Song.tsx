import {
  usePlayerDevice,
  useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk';
import useSpotify from '../../hooks/useSpotify';
import { convertMillisecondsToMinutesAndSeconds } from '../../lib/time';
import useStore from '../../store/useStore';

type Props = {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
};

function Song({ order, track }: Props) {
  const spotifyApi = useSpotify();
  const device = usePlayerDevice();

  const isPlaying = useStore((store) => store.isPlaying);
  const currentTrackId = useStore((store) => store.currentTrackId);
  const setIsPlaying = useStore((store) => store.setIsPlaying);
  const setCurrentTrackId = useStore((store) => store.setCurrentTrackId);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);

    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device?.device_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris: [track.track.uri] }),
        headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` },
      }
    )
      .then((res) => res.json())
      .then((x) => console.log(x));
  };

  const nameColor =
    isPlaying && currentTrackId === track.track.id
      ? 'text-green-500'
      : 'text-white';

  // TODO highlight currently playing
  return (
    <div
      className={`grid grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900`}
      onDoubleClick={playSong}
    >
      <div className="flex cursor-pointer items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0]?.url}
          alt=""
        />

        <div>
          <p
            className={`w-36 truncate ${nameColor} lg:w-64`}
            title={track.track.name}
          >
            {track.track.name}
          </p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{convertMillisecondsToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;