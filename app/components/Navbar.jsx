import { useState } from 'react';
import { LuBrain } from 'react-icons/lu';
import { UserAvatar } from '../components/UserAvatar';

const Navbar = () => {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="flex bg-white w-full px-8 py-4">
      <div className="flex items-center justify-between w-full">
        <button className="text-black flex items-center space-x-1 font-bold text-3xl">
          <LuBrain className="text-sky-300 size-8" />
          <span className="text-sky-300">Mind</span>Mate
        </button>
        <div className="relative">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
