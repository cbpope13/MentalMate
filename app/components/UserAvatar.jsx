import { SignedIn, UserButton } from '@clerk/nextjs';

export function UserAvatar() {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  );
}
