import { useEffect, useState } from 'react';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

function useCurrentTrack() {
  const player = useSpotifyPlayer();

  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!player) {
      return;
    }

    const callback = (state: Spotify.PlaybackState) => {
      setCurrentTrackId(state?.track_window?.current_track?.id || null);
      setIsPlaying(!state?.paused ?? false);
    };

    player.addListener('player_state_changed', callback);

    return () => player.removeListener('player_state_changed', callback);
  }, [player]);

  return { currentTrackId, isPlaying };
}

export default useCurrentTrack;
