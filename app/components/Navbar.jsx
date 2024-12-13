import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LuBrain } from 'react-icons/lu';
import { UserAvatar } from '../components/UserAvatar';

const Navbar = () => {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="flex bg-white w-full px-8 py-4">
      <div className="flex items-center justify-between w-full">
        <button className="text-black flex items-center space-x-1 font-bold text-3xl">
          <LuBrain className="text-blue-500 size-8" />
          <span className="text-blue-500">Mind</span>Mate
        </button>
        <div className="relative">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex items-center space-x-1 rounded-full"
          >
            <UserAvatar />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`size-4 ${
                accountOpen ? 'rotate-180' : ''
              } transition ease-in-out duration-300`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            hidden={!accountOpen}
            className="bg-white shadow-lg w-60 p-4 absolute top-12 right-0 rounded-xl border"
          >
            <div className="flex flex-col space-y-4">
              <p className="text-lg font-semibold">Account</p>
              <p className="text-neutral-600 text-sm">Manage your account</p>
              <button
                className="flex w-full items-center space-x-1 text-neutral-600 text-sm"
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <p>Sign Out</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
