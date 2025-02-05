import { render, useState } from 'hono/jsx/dom';

type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
};

function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const prompt = data.get('prompt') as string;

    const userMessage: ChatMessage = { role: 'user', content: prompt };

    setChatMessages((prevMessages) => prevMessages.concat(userMessage));

    form.reset();

    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        history: chatMessages.concat(userMessage),
      }),
    });

    const stream = response.body;

    if (!stream) {
      throw new Error('Response body is not a stream');
    }

    const reader = stream.getReader();

    setChatMessages((prevMessages) =>
      prevMessages.concat({ role: 'assistant', content: '' })
    );

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        return;
      }

      const text = new TextDecoder().decode(value);

      setChatMessages((prevMessages) => {
        const messages = prevMessages.slice();
        messages[messages.length - 1] = {
          role: 'assistant',
          content: messages[messages.length - 1].content + text,
        };
        return messages;
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p class="mb-4 flex flex-col gap-2">
          <label for="prompt" class="font-bold text-sm">
            Your Prompt
          </label>
          <textarea
            id="prompt"
            rows={3}
            name="prompt"
            class="bg-stone-700 rounded-sm p-2"
          />
        </p>
        <p class="text-right">
          <button class="bg-indigo-400 px-6 py-2 rounded-sm text-black hover:bg-indigo-500">
            Submit
          </button>
        </p>
      </form>
      <div class="w-9/10 mx-auto mt-8">
        {chatMessages.map((msg) => (
          <article
            class={`mb-4 p-6 rounded ${
              msg.role === 'user' ? 'bg-stone-700' : 'bg-stone-900'
            }`}
          >
            {msg.content}
          </article>
        ))}
      </div>
    </>
  );
}

const root = document.getElementById('chat');

if (!root) {
  throw new Error('Root element not found');
}

render(<Chat />, root);
