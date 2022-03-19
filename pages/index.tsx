import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/templates/Center';
import Player from '../components/organisms/Player';
import Sidebar from '../components/organisms/Sidebar';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import { useCallback } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const getToken = useCallback(
    (callback) => {
      const token = session?.user.accessToken;
      console.log('token', token);

      return callback(token);
    },
    [session]
  );

  return (
    <>
      <Head>
        <title>Spotify Clone</title>
      </Head>
      <div className="h-screen overflow-hidden bg-black">
        <WebPlaybackSDK
          initialDeviceName="Spotify Clone"
          getOAuthToken={getToken}
          initialVolume={0.5}
          connectOnInitialized={true}
        >
          <main className="flex">
            <Sidebar />
            <Center />
          </main>

          <div className="sticky bottom-0">
            <Player />
          </div>
        </WebPlaybackSDK>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
