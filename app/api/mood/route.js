import db from '@/lib/db';
import Mood from '@/models/Mood';
import { auth } from '@clerk/nextjs/server';

export async function GET(req) {
  await db.connect();

  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify(null), { status: 401 });
  }

  try {
    const Moods = await Mood.find({ user: userId });
    return new Response(JSON.stringify(Moods), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await db.connect();
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify(null), { status: 401 });
  }

  try {
    const body = await req.json();

    const user = userId;
    const newMood = await Mood.create({ ...body, user });
    return new Response(JSON.stringify(newMood), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
