import Songs from '../organisms/Songs';
import User from '../molecules/User';
import PlaylistHeader from '../organisms/PlaylistHeader';

export default function Center() {
  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <User />
      <PlaylistHeader />

      <Songs />
    </div>
  );
}
