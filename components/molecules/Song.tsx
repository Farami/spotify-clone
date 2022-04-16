import useSpotify from '../../hooks/useSpotify';
import { convertMillisecondsToMinutesAndSeconds } from '../../lib/time';
import useStore from '../../store/useStore';

type Props = {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
};

function Song({ order, track }: Props) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] = useStore((store) => [
    store.currentTrackId,
    store.setCurrentTrackId,
  ]);
  const [isPlaying, setIsPlaying] = useStore((store) => [
    store.isPlaying,
    store.setIsPlaying,
  ]);

  const playSong = async () => {
    // will be overriden by a listener later but this makes the interface more snappy
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);

    await spotifyApi.play(track.track.uri);
  };

  const nameColor =
    isPlaying && currentTrackId === track.track.id
      ? 'text-green-500'
      : 'text-white';

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

        <div className="truncate">
          <p className={`truncate ${nameColor}`} title={track.track.name}>
            {track.track.name}
          </p>
          <p className="truncate">{track.track.artists[0].name}</p>
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
