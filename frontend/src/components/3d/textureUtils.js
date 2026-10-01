import * as THREE from 'three';

// Cache generated textures so we don't recreate them every frame
const textureCache = {};

/**
 * Creates high-detail procedural skyscraper facade texture with lit/unlit windows,
 * floor slabs, and architectural window mullions.
 */
export function getSkyscraperTexture(theme = 'cyan') {
  const cacheKey = `skyscraper_${theme}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Dark glass background
  ctx.fillStyle = '#0a1020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw structural vertical columns
  ctx.fillStyle = '#0f172a';
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.fillRect(x, 0, 4, canvas.height);
  }

  // Draw horizontal floor divisions
  ctx.fillStyle = '#1e293b';
  for (let y = 0; y < canvas.height; y += 32) {
    ctx.fillRect(0, y, canvas.width, 6);
  }

  // Draw window panes with random lighting
  for (let y = 6; y < canvas.height; y += 32) {
    for (let x = 4; x < canvas.width; x += 32) {
      const rand = Math.random();
      if (rand > 0.45) {
        // Lit window
        if (theme === 'cyan') {
          ctx.fillStyle = rand > 0.8 ? '#7dd3fc' : rand > 0.6 ? '#38bdf8' : '#e0f2fe';
        } else if (theme === 'gold') {
          ctx.fillStyle = rand > 0.7 ? '#fef08a' : '#fde047';
        } else {
          ctx.fillStyle = '#67e8f9';
        }
      } else {
        // Dark unlit window with subtle blue/gray reflection
        ctx.fillStyle = '#080d1a';
      }
      ctx.fillRect(x + 2, y + 2, 24, 22);

      // Window frame highlight
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 2, y + 2, 24, 22);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);

  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates modern clean hospital facade texture with blue ribbon glass
 */
export function getHospitalTexture() {
  const cacheKey = 'hospital';
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // White / silver architectural composite panel
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Horizontal ribbon windows
  for (let y = 40; y < canvas.height; y += 80) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, y, canvas.width, 36);

    // Window vertical mullions
    ctx.fillStyle = '#cbd5e1';
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.fillRect(x, y, 3, 36);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates rooftop helipad texture with yellow perimeter circle and white 'H'
 */
export function getHelipadTexture() {
  const cacheKey = 'helipad';
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Dark concrete base
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Yellow landing ring
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(128, 128, 95, 0, Math.PI * 2);
  ctx.stroke();

  // White 'H' in the center
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 110px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', 128, 130);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates asphalt road texture with clean lane markings, dashed stripes, and curbs
 */
export function getRoadTexture(lanes = 4) {
  const cacheKey = `road_${lanes}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark asphalt base
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sidewalk concrete curbs on left and right edges
  ctx.fillStyle = '#334155';
  ctx.fillRect(0, 0, 16, canvas.height);
  ctx.fillRect(canvas.width - 16, 0, 16, canvas.height);

  // Solid white outer boundary lines
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 0, 4, canvas.height);
  ctx.fillRect(canvas.width - 24, 0, 4, canvas.height);

  // Double yellow median line in the center
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(124, 0, 3, canvas.height);
  ctx.fillRect(129, 0, 3, canvas.height);

  // Dashed white lane dividers
  ctx.fillStyle = '#ffffff';
  for (let y = 0; y < canvas.height; y += 48) {
    ctx.fillRect(72, y, 3, 24);
    ctx.fillRect(180, y, 3, 24);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 8);

  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates solar panel photovoltaic grid texture
 */
export function getSolarPanelTexture() {
  const cacheKey = 'solar';
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Blue photovoltaic cells
  for (let y = 4; y < canvas.height; y += 32) {
    for (let x = 4; x < canvas.width; x += 32) {
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(x, y, 28, 28);

      // Fine silver lines inside cell
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(x + 13, y, 2, 28);
      ctx.fillRect(x, y + 13, 28, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates animated or static rippling water texture for ponds and water tanks
 */
export function getWaterTexture() {
  const cacheKey = 'water_surface';
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Deep cyan-blue water gradient
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#0284c7');
  grad.addColorStop(0.5, '#0ea5e9');
  grad.addColorStop(1, '#0369a1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Caustic ripple highlights
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 256;
    const cy = Math.random() * 256;
    const r = 10 + Math.random() * 35;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates industrial metal corrugated panel texture
 */
export function getIndustrialFacadeTexture() {
  const cacheKey = 'industrial_facade';
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 256, 256);

  // Corrugated vertical metal ribs
  for (let x = 0; x < 256; x += 16) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x, 0, 8, 256);
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 8, 0, 8, 256);
  }

  // Yellow & black hazard safety stripe at bottom
  for (let x = 0; x < 256; x += 24) {
    ctx.fillStyle = '#eab308';
    ctx.fillRect(x, 236, 12, 20);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 12, 236, 12, 20);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache[cacheKey] = texture;
  return texture;
}

/**
 * Creates LED matrix route display texture for buses and metro
 */
export function getTransitSignTexture(text = 'CITY TRANSIT') {
  const cacheKey = `sign_${text}`;
  if (textureCache[cacheKey]) return textureCache[cacheKey];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 64);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache[cacheKey] = texture;
  return texture;
}

