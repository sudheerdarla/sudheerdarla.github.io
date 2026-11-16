// BharatLiquid waitlist 03: a ring of glossy pastel tokens (Figma 793:5406) rebuilt in 3D.
// The ring turns clockwise around its centre on the card's right edge, and every token also
// spins clockwise on its own face. Logos come from assets/logos and are embossed on each face.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.querySelector('[data-coins]');
const hero = document.querySelector('[data-hero]');
if (host && hero) start();

function start() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.matchMedia('(max-width: 860px)');

  // [logo file, coin colour]. Pastel, like the renders in the design.
  const TOKENS = [
    ['bitcoin', '#7DBEF0'], ['nvidia', '#B9E04A'], ['apple', '#D3D9E0'], ['ethereum', '#D9B1E8'],
    ['tesla', '#F59A8A'], ['gold', '#EBCB6E'], ['google', '#86D6BD'], ['solana', '#AE9BF2'],
    ['meta', '#86AEFB'], ['amazon', '#F6B262'], ['hyperliquid', '#6FD3D2'], ['anthropic', '#E9AA8D'],
    ['openai', '#C3CBD5'], ['spacex', '#9DB9DE']
  ];

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return; }  // no WebGL: the card simply shows without tokens
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-1, 1.2, 2); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fd8ff, 0.7); rim.position.set(1.5, -0.5, 1); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const FOV = 22;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 20000);

  // Coin body: a lathe profile with a raised rim and a rounded edge (radius 1, face normal +Z)
  const T = 0.17;
  const pts = [new THREE.Vector2(0, T / 2 - 0.014), new THREE.Vector2(0.8, T / 2 - 0.014), new THREE.Vector2(0.83, T / 2),
    new THREE.Vector2(0.9, T / 2 + 0.006)];
  for (let i = 0; i <= 10; i++) {
    const a = Math.PI / 2 - (i / 10) * Math.PI;  // round the edge from top to bottom
    pts.push(new THREE.Vector2(0.92 + 0.08 * Math.cos(a), (T / 2 + 0.006) * Math.sin(a)));
  }
  pts.push(new THREE.Vector2(0.83, -T / 2), new THREE.Vector2(0, -T / 2));
  const body = new THREE.LatheGeometry(pts, 72);
  body.rotateX(Math.PI / 2);
  const faceGeo = new THREE.CircleGeometry(0.8, 64);

  const ring = new THREE.Group();
  scene.add(ring);
  const coins = TOKENS.map(([logo, hex], i) => {
    const color = new THREE.Color(hex);
    const mat = new THREE.MeshPhysicalMaterial({
      color, roughness: 0.38, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.14,
      iridescence: 0.25, iridescenceIOR: 1.3, sheen: 0.2, sheenColor: new THREE.Color(0xffffff)
    });
    const pivot = new THREE.Group();
    const coin = new THREE.Group();
    coin.add(new THREE.Mesh(body, mat));
    const faceMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2, depthWrite: false });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.z = T / 2 - 0.012;
    face.visible = false;
    coin.add(face);
    pivot.add(coin);
    ring.add(pivot);
    emboss(logo, hex).then(({ map, bump }) => {
      faceMat.map = map; faceMat.bumpMap = bump; faceMat.bumpScale = 3; faceMat.needsUpdate = true; face.visible = true;
      if (paused) render(lastT);
    }).catch(() => {});
    return { pivot, coin, phase: (i / TOKENS.length) * Math.PI * 2 };
  });

  // Layout, in CSS pixels. World units are pixels at z = 0, origin in the card's centre.
  let W = 1, H = 1, R = 1, coinR = 1, cx = 0, cy = 0;
  const layout = () => {
    const r = hero.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false);
    renderer.domElement.style.width = W + 'px';
    renderer.domElement.style.height = H + 'px';
    camera.aspect = W / H;
    camera.position.set(0, 0, (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    camera.updateProjectionMatrix();
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
  const SPIN_PERIOD = 26;   // seconds per clockwise turn of each token on its face
  const TILT = 0.62, LEAN = 0.32;
  const qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qc = new THREE.Quaternion();
  const axis = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);
  let lastT = 0;
  const render = (t) => {
    lastT = t;
    const ringA = -(t / RING_PERIOD) * Math.PI * 2;  // negative = clockwise on screen
    const spin = -(t / SPIN_PERIOD) * Math.PI * 2;
    coins.forEach((c, i) => {
      const a = c.phase + ringA;
      c.pivot.position.set(R * Math.cos(a), R * Math.sin(a), 0);
      // Tip each face outward about the ring's tangent, lean it a little along the ring,
      // then spin it on its own face
      axis.set(-Math.sin(a), Math.cos(a), 0);
      qa.setFromAxisAngle(axis, TILT);
      axis.set(Math.cos(a), Math.sin(a), 0);
      qb.setFromAxisAngle(axis, LEAN);
      qc.setFromAxisAngle(Z, spin + i * 0.9);
      c.coin.quaternion.copy(qa).multiply(qb).multiply(qc);
      c.coin.position.z = Math.sin(a * 2 + i) * coinR * 0.05;  // a slight breathe in depth
    });
    renderer.render(scene, camera);
  };

  let paused = reduceMotion, raf = 0, t0 = performance.now() - 8000;
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

// Emboss a logo: a raised mark in a slightly deeper shade of the coin, lit from the top left,
// plus a soft height map so the clear coat catches its edges.
async function emboss(name, hex) {
  const S = 512;
  const svgText = await (await fetch('assets/logos/' + name + '.svg')).text();
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.documentElement;
  const vb = (svg.getAttribute('viewBox') || '0 0 100 100').split(/[\s,]+/).map(Number);
  svg.setAttribute('width', vb[2] * 8); svg.setAttribute('height', vb[3] * 8);
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  URL.revokeObjectURL(url);

  const box = S * 0.46, k = Math.min(box / vb[2], box / vb[3]);
  const w = vb[2] * k, h = vb[3] * k, x = (S - w) / 2, y = (S - h) / 2;
  const canvas = (fill) => {
    const c = document.createElement('canvas'); c.width = c.height = S;
    const g = c.getContext('2d'); g.drawImage(img, x, y, w, h);
    g.globalCompositeOperation = 'source-in'; g.fillStyle = fill; g.fillRect(0, 0, S, S);
    return c;
  };
  const base = new THREE.Color(hex);
  const deep = base.clone().multiplyScalar(0.82).getStyle();
  const dark = base.clone().multiplyScalar(0.45).getStyle();

  const face = document.createElement('canvas'); face.width = face.height = S;
  const f = face.getContext('2d');
  f.globalAlpha = 0.35; f.drawImage(canvas(dark), 5, 6);         // shadow below right
  f.globalAlpha = 0.75; f.drawImage(canvas('#ffffff'), -3, -3);  // highlight above left
  f.globalAlpha = 1; f.drawImage(canvas(deep), 0, 0);            // the mark

  const bumpC = document.createElement('canvas'); bumpC.width = bumpC.height = S;
  const b = bumpC.getContext('2d');
  b.fillStyle = '#000'; b.fillRect(0, 0, S, S); b.filter = 'blur(4px)'; b.drawImage(canvas('#ffffff'), 0, 0);

  const map = new THREE.CanvasTexture(face); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
  const bump = new THREE.CanvasTexture(bumpC);
  return { map, bump };
}
