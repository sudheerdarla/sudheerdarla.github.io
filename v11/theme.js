(function(){var r=document.documentElement,b=document.getElementById('theme');
function a(t,p){r.setAttribute('data-theme',t);if(b){b.setAttribute('aria-pressed',t==='dark');b.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');b.textContent=t==='dark'?'Light':'Dark';}if(p){try{localStorage.setItem('theme',t)}catch(e){}}}
a(r.getAttribute('data-theme')||'light',false);
if(b)b.addEventListener('click',function(){a(r.getAttribute('data-theme')==='dark'?'light':'dark',true)});})();
