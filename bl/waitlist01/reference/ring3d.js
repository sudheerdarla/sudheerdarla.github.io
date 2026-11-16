// Reference: the hero ring rebuilt in WebGL so its flaps can turn while the ring stays put.
// Not used on the live waitlist page, which shows the original render drifting slowly.
// Open reference/ring3d.html to see it. The ring is a set of thin elliptical discs (the
// "flaps"), each a cross-section of a torus, spinning slowly about the ring's own axis, so
// the blades travel around the hole and the outline never moves. Without WebGL, or with
// reduced motion, the original render (the <img> inside [data-ring]) is shown instead.
import * as THREE from './vendor/three.module.min.js';

const host = document.querySelector('[data-ring]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const T = Object.assign({
  discs: 34,          // number of flaps
  R: 1,               // ring radius (centre of the tube)
  r: 0.68,            // flap radius across the ring
  t: 0.032,           // flap thickness: the edges catch the rim light
  squash: 0.85,       // flap height along the ring's axis, relative to its width
  twist: 0.38,        // each flap leans about its own radial axis, as in the render
  tiltX: -0.65,       // view angle, matched to the Figma render
  tiltY: 0,
  tiltZ: 0.15,
  fov: 32,
  speed: 0.09,        // radians per second around the ring's axis: one flap passes every ~2s
  color: 0x2a7db0,
  key: 1.9,
  hemi: 1.7,
  rimI: 1.3,
  edgeI: 1.0,
  metal: 0,
  rough: 0.55,
}, window.RING_TUNE || {});

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

if (host && !reduceMotion && supportsWebGL()) start();

function start() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const canvas = renderer.domElement;
  canvas.className = 'ring__canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(T.fov, 1, 0.1, 50);
  camera.position.set(0, 0, 6);

  // Soft studio light: cool sky fill, a key from the upper left, a rim from behind right
  scene.add(new THREE.HemisphereLight(0x8cc4ea, 0x0b2436, T.hemi ?? 1.9));
  const key = new THREE.DirectionalLight(0xffffff, T.key ?? 2.6);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9ad8ff, T.rimI ?? 2.2);
  rim.position.set(4, -1, -3);
  scene.add(rim);
  const edge = new THREE.DirectionalLight(0xbfeaff, T.edgeI ?? 2.2); // grazing light for blade edges
  edge.position.set(3, 3, -1);
  scene.add(edge);

  const tilt = new THREE.Group();
  tilt.rotation.set(T.tiltX, T.tiltY, T.tiltZ);
  scene.add(tilt);
  const spin = new THREE.Group();
  tilt.add(spin);

  const geo = new THREE.CylinderGeometry(T.r, T.r, T.t, 96, 1);
  geo.scale(1, 1, T.squash); // elliptical flaps: wide across the ring, shallow along its axis
  // Satin faces, and bright edges like the render's highlights (cylinder groups: side, top, bottom)
  const face = new THREE.MeshStandardMaterial({ color: T.color, roughness: T.rough ?? 0.5, metalness: T.metal ?? 0.1 });
  const rimEdge = new THREE.MeshStandardMaterial({ color: 0x74c6ee, emissive: 0x15557a, roughness: 0.35, metalness: 0 });
  const mat = [rimEdge, face, face];
  for (let i = 0; i < T.discs; i++) {
    const a = (i / T.discs) * Math.PI * 2;
    const m = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(a) * T.R, Math.sin(a) * T.R, 0);
    m.rotation.order = 'ZYX'; // lean the flap first, then place it along the ring
    m.rotation.set(T.twist, 0, a); // cylinder axis follows the ring's tangent
    spin.add(m);
  }

  // Crop the view to the ring's own outline, so it fills the box the image used to fill.
  // The disc arrangement is symmetric about the spin axis, so this outline never changes.
  const samples = [];
  const tmp = new THREE.Vector3();
  function fit(w, h) {
    camera.aspect = 1;
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
    scene.updateMatrixWorld(true);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    if (!samples.length) {
      for (let k = 0; k < 48; k++) {
        const th = (k / 48) * Math.PI * 2;
        samples.push(new THREE.Vector3(Math.cos(th) * T.r, T.t / 2, Math.sin(th) * T.r * T.squash));
        samples.push(new THREE.Vector3(Math.cos(th) * T.r, -T.t / 2, Math.sin(th) * T.r * T.squash));
      }
    }
    spin.children.forEach((m) => {
      samples.forEach((p) => {
        tmp.copy(p).applyMatrix4(m.matrixWorld).project(camera);
        minX = Math.min(minX, tmp.x); maxX = Math.max(maxX, tmp.x);
        minY = Math.min(minY, tmp.y); maxY = Math.max(maxY, tmp.y);
      });
    });
    // NDC box to a virtual full frame of 1000 x 1000, padded to the canvas aspect
    const F = 1000;
    let x0 = (minX + 1) / 2 * F, x1 = (maxX + 1) / 2 * F;
    let y0 = (1 - maxY) / 2 * F, y1 = (1 - minY) / 2 * F;
    let bw = x1 - x0, bh = y1 - y0;
    const want = w / h;
    if (bw / bh < want) { const nw = bh * want; x0 -= (nw - bw) / 2; bw = nw; }
    else { const nh = bw / want; y0 -= (nh - bh) / 2; bh = nh; }
    camera.setViewOffset(F, F, x0, y0, bw, bh);
    camera.updateProjectionMatrix();
  }

  let w = 0, h = 0;
  function resize() {
    const b = host.getBoundingClientRect();
    if (!b.width || !b.height) return;
    w = Math.round(b.width); h = Math.round(b.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    fit(w, h);
    renderer.render(scene, camera);
  }

  host.appendChild(canvas);
  resize();
  host.classList.add('is-3d');
  new ResizeObserver(resize).observe(host);

  // Run only while the hero is on screen and the tab is visible
  let visible = true, raf = 0, last = performance.now();
  const loop = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    spin.rotation.z += dt * T.speed;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };
  const run = () => {
    const should = visible && !document.hidden;
    if (should && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    if (!should && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; run(); }).observe(host);
  document.addEventListener('visibilitychange', run);
  run();

}
