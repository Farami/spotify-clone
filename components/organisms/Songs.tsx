import useStore from '../../store/useStore';
import Song from '../molecules/Song';

function Songs() {
  const playlist = useStore((store) => store.playlist);

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
