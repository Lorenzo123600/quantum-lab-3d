// Original, geometric Quantum UI icons. No brand illustrations or mascots.
const paths = {
  speaker:'<path d="M11 4 6 8H3v8h3l5 4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  wave:'<path d="M2 12c3-12 7 12 10 0s7 12 10 0M2 19h20"/>',
  spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
  flask:'<path d="M9 3h6M10 3v7L4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1l-6-10V3M7 15h10"/><path d="M10 18h.01M14 17h.01"/>',
  trail:'<circle cx="5" cy="4" r="2"/><circle cx="19" cy="20" r="2"/><path d="M5 6v4c0 5 14-1 14 4v4"/>',
  book:'<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
  check:'<path d="m5 12 4 4L20 5"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  fullscreen:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6"/>',
  gear:'<path d="m10 2 4 0 1 3 3 1 3 1 1 4-2 2-1 3-1 3-4 2-2-2-3-1-3-1-2-4 2-2 1-3 1-3Z"/><circle cx="12" cy="12" r="3"/>',
  trophy:'<path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 14v5m-4 2h8"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
  history:'<path d="M4 8a9 9 0 1 1-1 8M3 3v6h6m3-3v6l4 2"/>',
};
export const lessonIcons = ['atom','wave','book','wave','spark','spark','atom','wave','target','target','wave','atom','history','chip','trophy','spark'];
export function icon(name, className = '') { return '<svg class="icon '+className+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name] || paths.spark)+'</svg>'; }
