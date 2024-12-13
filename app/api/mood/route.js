import { auth } from '@/auth';
import db from '@/lib/db';
import Mood from '@/models/Mood';

export async function GET(req) {
  await db.connect();

  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify(null), { status: 401 });
  }

  try {
    const Moods = await Mood.find({ user: session.user.id });
    return new Response(JSON.stringify(Moods), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await db.connect();
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify(null), { status: 401 });
  }

  try {
    const body = await req.json();

    const user = session.user.id;
    const newMood = await Mood.create({ ...body, user });
    return new Response(JSON.stringify(newMood), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
