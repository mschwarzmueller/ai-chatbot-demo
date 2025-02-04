import type { PropsWithChildren } from 'hono/jsx';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <head>
        <title>AI Researcher</title>
        {import.meta.env.DEV ? (
          <link rel="stylesheet" href="/client/base.css" />
        ) : (
          <link rel="stylesheet" href="/static/assets/base.css" />
        )}
      </head>
      <body class="bg-stone-800 text-stone-50">
        <main class="max-w-[50rem] my-6 mx-auto">{children}</main>
      </body>
    </html>
  );
}
