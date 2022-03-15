import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/templates/Center';
import Player from '../components/organisms/Player';
import Sidebar from '../components/organisms/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
      </Head>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
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
