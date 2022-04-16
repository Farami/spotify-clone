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

// TODO highlight currently selected

function Sidebar() {
  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4 overflow-x-hidden scrollbar-hide">
        <IconButton icon={HomeIcon} text="Home" />
        <IconButton icon={SearchIcon} text="Search" />
        <IconButton icon={LibraryIcon} text="Your Library" />

        <hr className="border-t-[0.1px] border-gray-900" />

        <IconButton icon={PlusCircleIcon} text="Create Playlist" />
        <IconButton icon={HeartIcon} text="Liked Songs" />
        <IconButton icon={RssIcon} text="Your Episodes" />

        <hr className="border-t-[0.1px] border-gray-900" />

        <Playlists />
      </div>
    </div>
  );
}

export default Sidebar;
