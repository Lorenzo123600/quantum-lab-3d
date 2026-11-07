// SI, except photon/work-function energies exposed in electronvolts.
export const H = 6.62607015e-34;
export const HBAR = H / (2 * Math.PI);
export const E_CHARGE = 1.602176634e-19;
export const C = 299792458;
export const ME = 9.1093837139e-31;
export const METALS = { cesio: { name: 'Césio', phi: 2.14 }, sodio: { name: 'Sódio', phi: 2.28 }, zinco: { name: 'Zinco', phi: 4.30 } };
export const photonEV = f => H * f / E_CHARGE;
export const photoelectric = (f, phi) => ({ energy: photonEV(f), kinetic: Math.max(0, photonEV(f) - phi), emits: photonEV(f) >= phi, threshold: phi * E_CHARGE / H });
export const fringeSpacing = (lambda, L, d) => lambda * L / d;
export const deBroglie = p => H / p;
export const hydrogenEnergy = n => -13.6 / (n * n);
export const transition = (from, to) => { const delta = hydrogenEnergy(to) - hydrogenEnergy(from); return { delta, frequency: Math.abs(delta) * E_CHARGE / H, wavelength: H * C / (Math.abs(delta) * E_CHARGE), type: delta > 0 ? 'absorção' : 'emissão' }; };
export const gaussianUncertainty = sigmaX => ({ sigmaX, sigmaP: HBAR / (2 * sigmaX), product: HBAR / 2 });
export const sinc = x => Math.abs(x) < 1e-8 ? 1 : Math.sin(x) / x;
// Fraunhofer: rectangular slits, equal illumination. y,L,d,a,lambda in meters.
// Incoherent which-path mixture: sum of shifted single-slit envelopes.
// This uses the paraxial approximation a,d << L; finite detector normalization is explicit.
export function doubleSlitIntensity(y, { lambda, L, d, a }, path = false) {
  const envelope = center => sinc(Math.PI * a * (y - center) / (lambda * L)) ** 2;
  return path ? (envelope(-d / 2) + envelope(d / 2)) / 2
    : envelope(0) * Math.cos(Math.PI * d * y / (lambda * L)) ** 2;
}
export function distribution(params, path = false, extent = .03, bins = 2048) {
  const cdf = new Float64Array(bins); let sum = 0;
  for (let i = 0; i < bins; i++) { sum += doubleSlitIntensity(-extent + (i + .5) * 2 * extent / bins, params, path); cdf[i] = sum; }
  for (let i = 0; i < bins; i++) cdf[i] /= sum;
  return { cdf, extent };
}
export function sampleDistribution({ cdf, extent }, rng = Math.random) {
  const u = rng(); let low = 0, high = cdf.length - 1;
  while (low < high) { const mid = (low + high) >>> 1; if (cdf[mid] < u) low = mid + 1; else high = mid; }
  return -extent + (low + rng()) * 2 * extent / cdf.length;
}
// Qualitative kinematic crystal model; not a fit to Davisson–Germer's nickel data.
export function braggIntensity(theta, lambda, spacing = .091e-9, planes = 8) {
  const phase = 2 * Math.PI * spacing * Math.sin(theta) / lambda;
  let re = 0, im = 0;
  for (let n = 0; n < planes; n++) { re += Math.cos(2 * n * phase); im += Math.sin(2 * n * phase); }
  return (re * re + im * im) / (planes * planes);
}
// Hydrogenic probability density, r in Bohr radii. Constant factors omitted;
// rejection sampling normalizes each orbital. 2p axis selected by component.
export function orbitalDensity(x, y, z, orbital) {
  const r = Math.hypot(x, y, z);
  if (orbital === '1s') return Math.exp(-2 * r);
  if (orbital === '2s') return (2 - r) ** 2 * Math.exp(-r) / 4;
  const axis = orbital === '2px' ? x : orbital === '2py' ? y : z;
  return axis * axis * Math.exp(-r) / 4;
}
export function sampleOrbital(orbital, count, rng = Math.random) {
  // Uniform-volume proposal in cube; density rejection yields |psi|² dV.
  const bound = orbital === '1s' ? 5 : 13;
  const ceiling = orbital.startsWith('2p') ? Math.exp(-2) : 1;
  const points = new Float32Array(count * 3);
  let n = 0;
  while (n < count) {
    const x = (rng() * 2 - 1) * bound, y = (rng() * 2 - 1) * bound, z = (rng() * 2 - 1) * bound;
    if (rng() * ceiling <= orbitalDensity(x, y, z, orbital)) { points.set([x, y, z], n * 3); n++; }
  }
  return points;
}
