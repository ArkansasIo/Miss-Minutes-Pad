import './style.css';
import {api} from './api';
import {createSpeechRecognizer,speak} from './speech';
const root=document.querySelector<HTMLDivElement>('#app')!;
root.innerHTML=`<section class="tem-pad"><header class="topbar"><div><span class="eyebrow">TVA TEMPAD</span><h1>MISS MINUTES</h1></div><span id="status" class="status">OFFLINE</span></header><main class="screen"><div id="clock" class="clock"></div><div class="avatar" id="avatar" aria-label="Animated clock character">◉</div><p id="message">Temporal interface ready.</p><form id="chat-form" class="chat-form"><input id="prompt" autocomplete="off" placeholder="Ask Miss Minutes…"><button>SEND</button><button id="listen" type="button">MIC</button></form></main><footer>AJAX · HTTPS API · MYSQL BACKEND · VOICE</footer></section>`;
const $=<T extends Element>(s:string)=>document.querySelector<T>(s)!;const status=$<HTMLSpanElement>('#status'),message=$<HTMLParagraphElement>('#message'),prompt=$<HTMLInputElement>('#prompt'),form=$<HTMLFormElement>('#chat-form'),listen=$<HTMLButtonElement>('#listen'),avatar=$<HTMLDivElement>('#avatar');
const updateClock=()=>$('#clock').textContent=new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'medium'}).format(new Date());updateClock();setInterval(updateClock,1000);
api.health().then(x=>{status.textContent=x.status.toUpperCase();status.dataset.online='true'}).catch(()=>status.textContent='API OFFLINE');
async function ask(text:string){message.textContent='Miss Minutes is thinking…';avatar.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:700});try{const r=await api.chat(text);message.textContent=r.reply;speak(r.reply)}catch(e){message.textContent=e instanceof Error?e.message:'Request failed'}finally{prompt.disabled=false;prompt.focus()}}
form.addEventListener('submit',e=>{e.preventDefault();const t=prompt.value.trim();if(t){prompt.value='';prompt.disabled=true;void ask(t)}});
const recognition=createSpeechRecognizer(t=>{prompt.value=t;void ask(t)},state=>{listen.textContent=state==='error'?'MIC ERR':'MIC'});
listen.addEventListener('click',()=>{if(!recognition){message.textContent='Speech recognition is not available in this browser.';return}listen.textContent='LISTENING';recognition.start()});
