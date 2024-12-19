import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import db from '@/lib/db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID
});

export async function POST(req) {
  await db.connect();
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify(null), { status: 401 });
  }

  try {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are mood analyst. Analyze the recent mood given the data set. "i" in the data set represents the mood level between 1 and 5, and the notes are what the user is thinking or feeling. Respond with an object with a mood analysis like "You have been feeling happy for the past few days. Keep it up!" and a suggested actions to improve mental health'
        },
        {
          role: 'user',
          content: JSON.stringify(body)
        }
      ]
    });

    return new Response(JSON.stringify(completion.choices[0].message), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
