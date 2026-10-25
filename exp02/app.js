(function(){
var d=document,r=d.documentElement;r.classList.remove('no-js');
/* sliding tab indicator */
var seg=d.querySelector('.seg');
if(seg){var ind=seg.querySelector('.ind'),links=[].slice.call(seg.querySelectorAll('a')),cur=seg.querySelector('[aria-current]');
function mv(a){if(!a)return;ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+(a.offsetLeft)+'px)';}
function home(){mv(cur||links[0]);}
function init(){home();seg.classList.add('ready');}
links.forEach(function(a){a.addEventListener('mouseenter',function(){mv(a)});a.addEventListener('focus',function(){mv(a)});});
seg.addEventListener('mouseleave',home);seg.addEventListener('focusout',home);
window.addEventListener('resize',home);
if(d.fonts&&d.fonts.ready){d.fonts.ready.then(init)}else{init()}init();}
/* scroll reveal, once */
var els=d.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)});}
else{els.forEach(function(e){e.classList.add('on')})}
})();
