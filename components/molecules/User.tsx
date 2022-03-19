import { ChevronDownIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function User() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="absolute top-5 right-8">
      <div
        className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
        onClick={() => signOut()}
      >
        <img
          className="h-10 w-10 rounded-full"
          src={session.user.image}
          alt=""
        />
        <h2>{session.user.name}</h2>
        <ChevronDownIcon className="h5 w-5" />
      </div>
    </header>
  );
}

export default User;
