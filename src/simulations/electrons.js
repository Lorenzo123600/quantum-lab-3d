import { distribution, sampleDistribution } from '../physics/models.js';
export class ElectronExperiment {
  constructor() { this.path = false; this.continuous = false; this.paused = false; this.pending = 0; this.fraction = 0; this.points = []; this.histogram = new Uint32Array(100); this.rebuild(); }
  rebuild() { this.dist = distribution({ lambda: 5e-12, L: 1, d: 2e-9, a: .4e-9 }, this.path, .012); }
  clear() { this.points = []; this.histogram.fill(0); this.total = 0; this.pending = 0; this.fraction = 0; }
  setPath(path) { this.path = path; this.clear(); this.rebuild(); }
  emit(n) { this.pending += n; }
  tick(dt) {
    if (this.paused) return;
    this.fraction += dt * (this.continuous ? 180 : 650);
    let n = Math.min(Math.floor(this.fraction), this.pending + (this.continuous ? 100000 : 0), 100);
    this.fraction -= Math.floor(this.fraction);
    while (n-- > 0) {
      if (this.pending > 0) this.pending--;
      const y = sampleDistribution(this.dist);
      const x = y / this.dist.extent;
      const vertical = Math.random() * 2 - 1;
      this.histogram[Math.min(99, Math.max(0, Math.floor((x + 1) * 50)))]++;
      this.points.push([x, vertical]);
      if (this.points.length > 12000) this.points.shift();
      this.total = (this.total || 0) + 1;
    }
  }
}
