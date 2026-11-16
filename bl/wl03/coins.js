// BharatLiquid waitlist 03: a ring of satin pastel tokens (Figma 793:5406) rebuilt in 3D.
// The ring turns clockwise around its centre on the card's right edge. Each token turns slowly
// clockwise on its face and flips over every few seconds, so both sides show. Faces carry a
// two-tone gradient and the logo engraved as a fine outline, like the renders in the design.
// Logos come from assets/logos.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.querySelector('[data-coins]');
const hero = document.querySelector('[data-hero]');
if (host && hero) start();

function start() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.matchMedia('(max-width: 860px)');

  // [logo, gradient from, gradient to, metal]. Colours sampled from the design's renders.
  const TOKENS = [
    ['bitcoin', '#86C3F0', '#B7E0F8', 0], ['ethereum', '#EBD6F2', '#C6A3D9', 0], ['nvidia', '#D2EE6A', '#B4E6CF', 0],
    ['apple', '#F1F4F6', '#C7D0D8', 0.15], ['gold', '#E7CF84', '#F7EDCB', 0.75], ['tesla', '#F59A3C', '#A97CD9', 0],
    ['google', '#A6E5CC', '#E2F6EE', 0], ['solana', '#B9B2F7', '#E3C6F2', 0], ['meta', '#8FB6F7', '#C9DCFB', 0],
    ['amazon', '#F9CDA4', '#F2A69C', 0], ['hyperliquid', '#97E3E0', '#D2F1F5', 0], ['anthropic', '#F2B9A1', '#F7DDBF', 0],
    ['openai', '#DDE2E7', '#B8C1CB', 0.2], ['spacex', '#9CB6E3', '#D6E2F6', 0]
  ];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return; }  // no WebGL: the card simply shows without tokens
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;   // keeps the pastels from washing out
  renderer.toneMappingExposure = 1.0;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  scene.environmentIntensity = 0.8;
  // Soft studio light from the top left, a cool fill from the right
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-1.2, 1.4, 2.2); scene.add(key);
  const fill = new THREE.DirectionalLight(0xcfe8ff, 0.6); fill.position.set(1.6, -0.4, 1.2); scene.add(fill);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4a5a, 0.35));

  const FOV = 22;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 20000);

  // Coin body: flat faces and a softly rounded edge (radius 1, thickness 0.15, face normal +Z)
  const T = 0.15, RC = 0.06, FACE = 1 - RC;
  const pts = [new THREE.Vector2(0, T / 2), new THREE.Vector2(FACE, T / 2)];
  for (let i = 1; i <= 8; i++) { const a = Math.PI / 2 - (i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(FACE + RC * Math.cos(a), T / 2 - RC + RC * Math.sin(a))); }
  for (let i = 0; i <= 8; i++) { const a = -(i / 8) * (Math.PI / 2); pts.push(new THREE.Vector2(FACE + RC * Math.cos(a), -T / 2 + RC + RC * Math.sin(a))); }
  pts.push(new THREE.Vector2(0, -T / 2));
  const body = new THREE.LatheGeometry(pts, 96);
  body.rotateX(Math.PI / 2);
  const faceGeo = new THREE.CircleGeometry(FACE, 96);

  const ring = new THREE.Group();
  scene.add(ring);
  const coins = TOKENS.map(([logo, c1, c2, metal], i) => {
    const a = new THREE.Color(c1), b = new THREE.Color(c2);
    // The edge: a lighter, glossier blend of the face colours, so it catches the light
    const edge = a.clone().lerp(b, 0.5).lerp(new THREE.Color(0xffffff), 0.18);
    const edgeMat = new THREE.MeshPhysicalMaterial({ color: edge, roughness: 0.28, metalness: metal, clearcoat: 1, clearcoatRoughness: 0.12, sheen: 0.4, sheenColor: new THREE.Color(0xffffff) });
    const faceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.42, metalness: metal, clearcoat: 0.55, clearcoatRoughness: 0.3,
      sheen: 0.6, sheenRoughness: 0.5, sheenColor: a.clone().lerp(new THREE.Color(0xffffff), 0.6)
    });
    faceMat.color.copy(a.clone().lerp(b, 0.5));   // until the texture is ready
    const pivot = new THREE.Group();
    const coin = new THREE.Group();
    coin.add(new THREE.Mesh(body, edgeMat));
    const front = new THREE.Mesh(faceGeo, faceMat); front.position.z = T / 2 + 0.0015;
    const back = new THREE.Mesh(faceGeo, faceMat); back.position.z = -T / 2 - 0.0015; back.rotation.y = Math.PI;
    coin.add(front, back);
    pivot.add(coin);
    ring.add(pivot);
    face(logo, c1, c2).then(({ map, bump }) => {
      faceMat.color.set(0xffffff);
      faceMat.map = map; faceMat.bumpMap = bump; faceMat.bumpScale = 2.4; faceMat.needsUpdate = true;
      if (paused) render(lastT);
    }).catch(() => {});
    return { pivot, coin, phase: (i / TOKENS.length) * Math.PI * 2, flipAt: (i * 1.37) % 5 };
  });

  // Layout, in CSS pixels. World units are pixels at z = 0, origin in the card's centre.
  let W = 1, H = 1, R = 1, coinR = 1;
  const layout = () => {
    const r = hero.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false);
    renderer.domElement.style.width = W + 'px';
    renderer.domElement.style.height = H + 'px';
    camera.aspect = W / H;
    camera.position.set(0, 0, (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    camera.updateProjectionMatrix();
    let cx, cy;
    if (narrow.matches) {
      // Phones: the ring rises from the bottom centre, beneath the copy
      R = Math.min(W * 0.62, H * 0.42); coinR = R * 0.3;
      cx = W / 2; cy = H + R * 0.38;
    } else {
      // Desktop: centred just past the card's right edge, as in the design (1402 x 715 card).
      // Sized by the height, but never wider than the design's share of the card, so the
      // tokens stay clear of the copy on narrower windows.
      const base = Math.min(H, W * 0.5);
      R = base * 0.5; coinR = base * 0.148;
      cx = W + base * 0.013; cy = H * 0.487;
    }
    ring.position.set(cx - W / 2, H / 2 - cy, 0);
    coins.forEach(c => c.coin.scale.setScalar(coinR));
  };

  const RING_PERIOD = 70;   // seconds per clockwise turn of the ring
  const SPIN_PERIOD = 40;   // seconds per clockwise turn of each token on its face
  const FLIP_EVERY = 5, FLIP_TIME = 1.1;  // each token flips over once every 5s, taking 1.1s
  const TILT = 0.78, LEAN = 0.38;
  const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const flipAngle = (t) => {
    const u = t / FLIP_EVERY, k = Math.floor(u), f = (u - k) * FLIP_EVERY;
    return Math.PI * (k + (f < FLIP_TIME ? ease(f / FLIP_TIME) : 1));
  };
  const qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qf = new THREE.Quaternion(), qs = new THREE.Quaternion();
  const axis = new THREE.Vector3(), X = new THREE.Vector3(1, 0, 0), Z = new THREE.Vector3(0, 0, 1);
  let lastT = 0;
  const render = (t) => {
    lastT = t;
    const ringA = -(t / RING_PERIOD) * Math.PI * 2;  // negative = clockwise on screen
    const spin = -(t / SPIN_PERIOD) * Math.PI * 2;
    coins.forEach((c, i) => {
      const a = c.phase + ringA;
      c.pivot.position.set(R * Math.cos(a), R * Math.sin(a), 0);
      // Tip each face outward about the ring's tangent and lean it a little along the ring,
      // then flip it over its own diameter and turn it on its face
      axis.set(-Math.sin(a), Math.cos(a), 0); qa.setFromAxisAngle(axis, TILT);
      axis.set(Math.cos(a), Math.sin(a), 0); qb.setFromAxisAngle(axis, LEAN);
      qf.setFromAxisAngle(X, -flipAngle(t + c.flipAt));
      qs.setFromAxisAngle(Z, spin + i * 0.45);
      c.coin.quaternion.copy(qa).multiply(qb).multiply(qf).multiply(qs);
      c.coin.position.z = Math.sin(a * 2 + i) * coinR * 0.05;  // a slight breathe in depth
    });
    renderer.render(scene, camera);
  };

  let paused = reduceMotion, raf = 0;
  const t0 = performance.now() - 8000;
  const loop = (now) => { render((now - t0) / 1000); raf = requestAnimationFrame(loop); };
  const play = () => { if (!paused && !raf) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  layout();
  render(8);
  play();
  new ResizeObserver(() => { layout(); render(lastT); }).observe(hero);
  narrow.addEventListener('change', () => { layout(); render(lastT); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else play(); });
  // Only animate while the card is on screen
  new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); else stop(); }).observe(hero);
  host.classList.add('is-ready');
}

// A token face: a diagonal two-tone gradient with the logo engraved as a fine outline
// (a groove in a deeper shade, lit from the top left), plus a height map for the groove.
async function face(name, c1, c2) {
  const S = 768;
  const svgText = await (await fetch('assets/logos/' + name + '.svg')).text();
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.documentElement;
  const vb = (svg.getAttribute('viewBox') || '0 0 100 100').split(/[\s,]+/).map(Number);
  svg.setAttribute('width', vb[2] * 8); svg.setAttribute('height', vb[3] * 8);
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  URL.revokeObjectURL(url);

  const make = () => { const c = document.createElement('canvas'); c.width = c.height = S; return c; };
  const box = S * 0.5, k = Math.min(box / vb[2], box / vb[3]);
  const w = vb[2] * k, h = vb[3] * k, x = (S - w) / 2, y = (S - h) / 2;
  // The logo as a solid white mask
  const mask = make(); const m = mask.getContext('2d');
  m.drawImage(img, x, y, w, h); m.globalCompositeOperation = 'source-in'; m.fillStyle = '#fff'; m.fillRect(0, 0, S, S);
  // The outline: the mask grown by a few pixels, minus the mask itself
  const line = make(); const l = line.getContext('2d');
  const grow = S * 0.007;
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; l.drawImage(mask, Math.cos(a) * grow, Math.sin(a) * grow); }
  l.globalCompositeOperation = 'destination-out'; l.drawImage(mask, 0, 0);
  const tint = (src, fill) => { const c = make(); const g = c.getContext('2d'); g.drawImage(src, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = fill; g.fillRect(0, 0, S, S); return c; };

  const A = new THREE.Color(c1), B = new THREE.Color(c2);
  const mid = A.clone().lerp(B, 0.5);
  const out = make(); const f = out.getContext('2d');
  const grad = f.createLinearGradient(S * 0.1, S * 0.1, S * 0.9, S * 0.9);
  grad.addColorStop(0, '#' + A.getHexString()); grad.addColorStop(1, '#' + B.getHexString());
  f.fillStyle = grad; f.fillRect(0, 0, S, S);
  // A soft sheen across the upper left
  const sheen = f.createRadialGradient(S * 0.3, S * 0.25, 0, S * 0.3, S * 0.25, S * 0.7);
  sheen.addColorStop(0, 'rgba(255,255,255,0.28)'); sheen.addColorStop(1, 'rgba(255,255,255,0)');
  f.fillStyle = sheen; f.fillRect(0, 0, S, S);
  // The logo's body is a touch lighter, the groove deeper, with a highlight on its lower right lip
  const shade = (k) => '#' + mid.clone().multiplyScalar(k).getHexString();
  f.globalAlpha = 0.1; f.drawImage(tint(mask, '#ffffff'), 0, 0);
  f.globalAlpha = 0.55; f.drawImage(tint(line, '#ffffff'), 1.5, 1.5);
  f.globalAlpha = 1; f.drawImage(tint(line, shade(0.66)), 0, 0);
  f.globalAlpha = 0.45; f.drawImage(tint(line, shade(0.4)), -1, -1);

  const bumpC = make(); const b = bumpC.getContext('2d');
  b.fillStyle = '#fff'; b.fillRect(0, 0, S, S); b.filter = 'blur(1.5px)'; b.drawImage(tint(line, '#000'), 0, 0);

  const map = new THREE.CanvasTexture(out); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
  const bump = new THREE.CanvasTexture(bumpC);
  return { map, bump };
}
