import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Document = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // ✅ Await params before using its properties

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect('/');

  return (
    <main className='flex w-full flex-col items-center'>
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={room.users}
      />
    </main>
  );
}

export default Document;
