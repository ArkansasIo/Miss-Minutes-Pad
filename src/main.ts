import './style.css';
import { api } from './api';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) throw new Error('Missing #app root');

app.innerHTML = `
  <section class="tem-pad" aria-label="TVA TemPad">
    <header class="topbar">
      <div>
        <span class="eyebrow">TVA TEMPAD</span>
        <h1>MISS MINUTES</h1>
      </div>
      <span id="status" class="status">OFFLINE</span>
    </header>
    <main class="screen">
      <div class="clock" id="clock"></div>
      <div class="avatar" aria-hidden="true">◉</div>
      <p id="message">Temporal interface ready.</p>
      <form id="chat-form" class="chat-form">
        <input id="prompt" name="prompt" autocomplete="off" placeholder="Ask Miss Minutes…" />
        <button type="submit">SEND</button>
      </form>
    </main>
    <footer>AJAX LINK · HTTPS API · MYSQL BACKEND</footer>
  </section>
`;

const status = document.querySelector<HTMLSpanElement>('#status')!;
const message = document.querySelector<HTMLParagraphElement>('#message')!;
const form = document.querySelector<HTMLFormElement>('#chat-form')!;
const prompt = document.querySelector<HTMLInputElement>('#prompt')!;
const clock = document.querySelector<HTMLDivElement>('#clock')!;

const updateClock = () => {
  clock.textContent = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date());
};

updateClock();
setInterval(updateClock, 1000);

api.health()
  .then((result) => {
    status.textContent = result.status.toUpperCase();
    status.dataset.online = 'true';
  })
  .catch(() => {
    status.textContent = 'API OFFLINE';
  });

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = prompt.value.trim();
  if (!text) return;

  message.textContent = 'Miss Minutes is thinking…';
  prompt.disabled = true;

  try {
    const result = await api.chat(text);
    message.textContent = result.reply;
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : 'AJAX request failed.';
  } finally {
    prompt.disabled = false;
    prompt.focus();
  }
});
