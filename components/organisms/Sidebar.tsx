import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import IconButton from '../atoms/IconButton';
import Playlists from '../molecules/Playlists';

function Sidebar() {
  return (
    <div className="text-md h-screen w-64 flex-col space-y-4 border-r border-gray-900 pl-4 pt-4 pb-24 text-gray-500 md:flex">
      <IconButton icon={HomeIcon} text="Home" />
      <IconButton icon={SearchIcon} text="Search" />
      <IconButton icon={LibraryIcon} text="Your Library" />

      <hr className="border-t-[0.1px] border-gray-900" />

      <IconButton icon={PlusCircleIcon} text="Create Playlist" />
      <IconButton icon={HeartIcon} text="Liked Songs" />
      <IconButton icon={RssIcon} text="Your Episodes" />

      <hr className="border-t-[0.1px] border-gray-900" />

      <div className="h-full flex-1 space-y-4 overflow-x-hidden overflow-y-scroll pb-4 pr-6 scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-900">
        <Playlists />
      </div>
    </div>
  );
}

export default Sidebar;
