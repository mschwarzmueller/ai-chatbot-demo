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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github-dark.min.css"
        ></link>
      </head>
      <body class="bg-stone-800 text-stone-50">
        <main class="max-w-[50rem] mx-auto">{children}</main>
      </body>
    </html>
  );
}
