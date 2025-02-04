import Layout from './shared/layout';

export default function IndexPage() {
  return (
    <Layout>
      <div id="counter"></div>
      {import.meta.env.DEV ? (
        <script type="module" src="/client/counter.tsx"></script>
      ) : (
        <script type="module" src="/static/counter.js"></script>
      )}
    </Layout>
  );
}
