import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
      <div className="flex flex-col space-y-8 bg-white p-4 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold w-full flex items-center justify-center">
          Sign In
        </h1>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <button
            className="flex p-4 w-full border hover:bg-blue-50 rounded-lg"
            type="submit"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="ml-2">Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
