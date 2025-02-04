import { useState, render } from 'hono/jsx/dom';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div class="text-center">
      <div class="flex gap-2 justify-center mb-6">
        <button
          class="bg-stone-600 px-6 py-2 rounded-sm"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Increment
        </button>
        <button
          class="bg-stone-600 px-6 py-2 rounded-sm"
          onClick={() => setCount((prevCount) => prevCount - 1)}
        >
          Decrement
        </button>
      </div>
      <div class="text-3xl font-bold">{count}</div>
    </div>
  );
}

const root = document.getElementById('counter');

if (!root) {
  throw new Error('Root element not found');
}

render(<Counter />, root);
