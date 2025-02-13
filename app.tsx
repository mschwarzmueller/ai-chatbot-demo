import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { streamText } from 'hono/streaming';
import { streamText as generateStream } from 'ai';
import { openai } from '@ai-sdk/openai';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';

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

  let completeMessage = '';

  return streamText(c, async (stream) => {
    for await (const chunk of textStream) {
      completeMessage += chunk;
      const htmlFile = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(completeMessage);

      stream.write(htmlFile.toString());
    }
  });
});

app.get('/', (c) => c.html(<IndexPage />));

export default app;
