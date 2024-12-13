import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID
});

export async function POST(req) {
  const body = await req.json();

  if (body.id === 1) {
    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: JSON.stringify(body.message)
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: 'asst_9dl3jsP0byiJtPaTG10Z4fbU'
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      return new Response(JSON.stringify(messages.data[0]), {
        status: 200
      });
    } else {
      return new Response(JSON.stringify('error'), { status: 500 });
    }
  } else if (body.id > 1) {
    const thread = body.thread_id;

    const message = await openai.beta.threads.messages.create(thread, {
      role: 'user',
      content: JSON.stringify(body.message)
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread, {
      assistant_id: 'asst_9dl3jsP0byiJtPaTG10Z4fbU'
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id);

      return new Response(JSON.stringify(messages.data[0]), { status: 200 });
    } else {
      return new Response(JSON.stringify('error'), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify('error'), { status: 500 });
  }
}
