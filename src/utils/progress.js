export const PROGRESS_KEY = 'quantum-lab-progress-v1';
export const XP_PER_LESSON = 20;
export const badges = [
  { count: 1, name: 'Primeira descoberta', icon: 'spark' },
  { count: 4, name: 'Olhar científico', icon: 'flask' },
  { count: 8, name: 'Explorador da matéria', icon: 'atom' },
  { count: 16, name: 'Jornada quântica', icon: 'trophy' },
];

// Persist only validated chapter IDs. XP is derived, so revisits cannot farm points.
export class LearningProgress {
  constructor(storage, onChange = () => {}) {
    this.storage = storage; this.onChange = onChange; this.completed = new Set(); this.lastChapter = 0; this.saved = true;
    try {
      const value = JSON.parse(storage?.getItem(PROGRESS_KEY) || 'null');
      if (value?.version === 1) {
        for (const n of Array.isArray(value.completed) ? value.completed : []) if (Number.isInteger(n) && n >= 0 && n < 16) this.completed.add(n);
        if (Number.isInteger(value.lastChapter) && value.lastChapter >= 0 && value.lastChapter < 16) this.lastChapter = value.lastChapter;
      }
    } catch { this.saved = false; }
  }
  get xp() { return this.completed.size * XP_PER_LESSON; }
  get earnedBadges() { return badges.filter(b => this.completed.size >= b.count); }
  persist() {
    try { this.storage?.setItem(PROGRESS_KEY, JSON.stringify({ version: 1, completed: [...this.completed], lastChapter: this.lastChapter })); this.saved = !!this.storage; }
    catch { this.saved = false; }
  }
  visit(index) { if (!Number.isInteger(index) || index < 0 || index > 15) return; this.lastChapter = index; this.persist(); }
  complete(index) {
    if (!Number.isInteger(index) || index < 0 || index > 15 || this.completed.has(index)) return false;
    const previousBadges = this.earnedBadges.length;
    this.completed.add(index); this.persist();
    this.onChange({ index, xp: this.xp, newBadge: this.earnedBadges[previousBadges], saved: this.saved });
    return true;
  }
  clear() { this.completed.clear(); this.lastChapter = 0; this.persist(); this.onChange({ reset: true, xp: 0, saved: this.saved }); }
}
