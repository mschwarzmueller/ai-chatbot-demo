import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { streamText } from 'hono/streaming';
import { streamText as generateStream } from 'ai';
import { openai } from '@ai-sdk/openai';

import IndexPage from './pages/index';
import ChatPage from './pages/chat';

const openAiModel = openai('gpt-4o-mini');
const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

app.get('/chat', (c) => c.html(<ChatPage />));

app.post('/chat', async (c) => {
  const { history } = await c.req.json();

  const { textStream } = generateStream({
    model: openAiModel,
    messages: history,
  });

  return streamText(c, async (stream) => {
    stream.pipe(textStream);
  });
});

app.get('/', (c) => c.html(<IndexPage />));

export default app;
