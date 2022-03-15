import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const slimApi = {
  getPlaylist: async (playlistId: string) =>
    spotifyApi.getPlaylist(playlistId).then(({ body }) => body),
  getUserPlaylists: async () =>
    spotifyApi.getUserPlaylists().then(({ body }) => body.items),
  play: (trackId?: string | string[]) =>
    spotifyApi.play(
      trackId
        ? { uris: Array.isArray(trackId) ? trackId : [trackId] }
        : undefined
    ),
  pause: () => spotifyApi.pause(),
  getMyCurrentPlayingTrackId: () =>
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then(({ body }) => body?.item?.id || null),
  getMyCurrentPlaybackState: () =>
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(({ body }) => body?.is_playing ?? false),
  getAccessToken: () => spotifyApi.getAccessToken(),
  skipToPrevious: () => spotifyApi.skipToPrevious(),
  skipToNext: () => spotifyApi.skipToNext(),
  setVolume: (volume: number) => spotifyApi.setVolume(volume),
};

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.error === 'RefreshAccessTokenError') {
      signIn();
    }

    spotifyApi.setAccessToken(session.user.accessToken!);
  }, [session]);

  return slimApi;
}
