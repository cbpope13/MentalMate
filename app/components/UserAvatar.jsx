'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export function UserAvatar() {
  const session = useSession();
  if (!session?.data?.user) return null;

  return (
    <div className="w-10 h-10">
      <Image
        className="rounded-full"
        src={session.data.user.image}
        alt="User avatar"
        width={50}
        height={50}
      />
    </div>
  );
}
