(function(){var r=document.documentElement,b=document.getElementById('theme');
function a(t,p){r.setAttribute('data-theme',t);var m=document.getElementById('theme-color');if(m)m.setAttribute('content',t==='dark'?'#121110':'#f4f2ee');if(b){b.setAttribute('aria-pressed',t==='dark');b.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');}if(p){try{localStorage.setItem('theme',t)}catch(e){}}}
a(r.getAttribute('data-theme')||'light',false);
if(b)b.addEventListener('click',function(){a(r.getAttribute('data-theme')==='dark'?'light':'dark',true)});
var c=document.getElementById('clock');
function tick(){if(!c)return;try{c.textContent='HYD '+new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'}).format(new Date())}catch(e){}}
tick();setInterval(tick,30000);})();
