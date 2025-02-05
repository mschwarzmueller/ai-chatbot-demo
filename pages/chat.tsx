import Layout from './shared/layout';

export default function ChatPage() {
  return (
    <Layout>
      <div id="chat"></div>
      {import.meta.env.DEV ? (
        <script type="module" src="/client/chat.tsx"></script>
      ) : (
        <script type="module" src="/static/chat.js"></script>
      )}
    </Layout>
  );
}
