import Link from 'next/link';
import { LuBrain } from 'react-icons/lu';

const Home = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <button className="text-black flex items-center space-x-1 font-bold text-3xl">
        <LuBrain className="text-sky-300 size-8" />
        <span className="text-sky-300">Mind</span>Mate
      </button>
      <Link
        className="bg-sky-300 px-4 py-2 text-white font-semibold rounded-lg"
        href="/dashboard"
      >
        Sign in
      </Link>
    </div>
  );
};

export default Home;
