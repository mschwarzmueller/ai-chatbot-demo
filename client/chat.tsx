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
    <div class="flex flex-col w-[50rem] min-h-screen py-8">
      <div class="flex-1 flex flex-col justify-end pb-8 gap-4">
        {chatMessages.length === 0 && <p>How may I help you?</p>}
        {chatMessages.map((msg) => (
          <article
            class={msg.role === 'assistant' ? '' : 'text-stone-400'}
          >
            {msg.content}
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit} class="bg-stone-900 px-12 py-6 rounded -mx-12">
        <p class="mb-4 flex flex-col gap-2">
          <label for="prompt" class="font-bold text-sm text-stone-300">
            Your Prompt
          </label>
          <textarea
            id="prompt"
            rows={3}
            name="prompt"
            class="border border-white rounded-sm p-2"
          />
        </p>
        <p class="text-right">
          <button class="bg-indigo-400 px-6 py-2 rounded-sm text-black hover:bg-indigo-500">
            Submit
          </button>
        </p>
      </form>
    </div>
  );
}

const root = document.getElementById('chat');

if (!root) {
  throw new Error('Root element not found');
}

render(<Chat />, root);
