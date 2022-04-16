import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from './useSpotify';

function usePlaylists() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // todo add proper pagination
  useEffect(() => {
    fetch();

    async function fetch() {
      let limit = 50;
      let offset = 0;
      let total = 0;

      // TODO properly paginate playlists

      const fetchedPlaylists = [];
      do {
        console.log(
          `fetching playlists limit ${limit}, offset ${offset}, total ${total}`
        );

        const {
          body: { items, total: totalFromResult },
        } = await spotifyApi.getUserPlaylists({ limit, offset });

        fetchedPlaylists.push(...items);

        total = totalFromResult;
        offset += limit;
      } while (offset < total);

      setPlaylists(fetchedPlaylists);
      setIsLoading(false);
    }
  }, [session, spotifyApi]);

  return { isLoading, playlists };
}

export default usePlaylists;
