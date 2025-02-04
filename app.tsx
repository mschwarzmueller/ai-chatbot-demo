import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

import IndexPage from './pages';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

app.get('/', (c) => c.html(<IndexPage />));

export default app;
