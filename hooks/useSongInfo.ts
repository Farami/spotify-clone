import { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import useSpotify from './useSpotify';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const currentTrackId = useStore((store) => store.currentTrackId);
  const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull | null>(
    null
  );

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
