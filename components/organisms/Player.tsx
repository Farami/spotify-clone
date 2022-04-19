import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import {
  usePlayerDevice,
  useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk';
import useCurrentTrack from '../../hooks/useCurrentTrack';
import useSongInfo from '../../hooks/useSongInfo';
import useSpotify from '../../hooks/useSpotify';
import useStore from '../../store/useStore';

// TODO implement missing buttons

function Player() {
  const spotifyApi = useSpotify();
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const songInfo = useSongInfo();
  const { currentTrackId, isPlaying } = useCurrentTrack();

  const { data: session } = useSession();

  const [volume, setVolume] = useState(50);

  // const fetchCurrentSong = async () => {
  //   if (!songInfo) {
  //     setCurrentTrackId(await spotifyApi.getMyCurrentPlayingTrackId());
  //     setIsPlaying(await spotifyApi.getMyCurrentPlaybackState());
  //   }
  // };

  const handlePlayPause = async () => {
    const apiPlaying = await spotifyApi.getMyCurrentPlaybackState();
    if (apiPlaying) {
      await player?.pause();
    } else {
      await player?.resume();
    }
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (!device) {
      return;
    }

    fetch(`https://api.spotify.com/v1/me/player`, {
      method: 'PUT',
      body: JSON.stringify({
        device_ids: [device.device_id],
        play: false,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    });
  }, [device?.device_id]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(console.error);
    }, 100),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/* left */}
      <div className="flex items-center space-x-4">
        {songInfo?.album.images?.[0] && (
          <img
            className="hidden h-10 w-10 md:inline"
            src={songInfo?.album?.images?.[0]?.url}
            alt=""
          />
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          onClick={() => player?.previousTrack()}
        />
        {isPlaying ? (
          <PauseIcon className="button h-10 w-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button h-10 w-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon
          className="button"
          onClick={() => player?.nextTrack()}
        />
        <ReplyIcon className="button" />
      </div>

      {/* right */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
