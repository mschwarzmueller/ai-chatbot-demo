import Layout from './shared/layout';

export default function ChatPage({
  chats,
  chatId,
  messages,
}: {
  chats: { id: string; title: string }[];
  chatId: string;
  messages: { role: string; content: string }[];
}) {
  return (
    <Layout>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.chatId = ${JSON.stringify(
            chatId
          )}; window.messages = ${JSON.stringify(
            messages
          )}; window.chats = ${JSON.stringify(chats)};`,
        }}
      />

      <div id="chat"></div>
      {import.meta.env.DEV ? (
        <script type="module" src="/client/chat.tsx"></script>
      ) : (
        <script type="module" src="/static/chat.js"></script>
      )}
    </Layout>
  );
}
