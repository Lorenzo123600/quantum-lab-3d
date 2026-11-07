export function slider(root, label, min, max, step, value, onChange, format = v => String(v)) {
  const el = document.createElement('label'); el.className = 'slider-control';
  el.innerHTML = '<span></span><output></output><input type="range">';
  el.children[0].textContent = label; const out = el.children[1], input = el.children[2];
  Object.assign(input, { min, max, step, value });
  const update = () => { const v = +input.value; out.textContent = format(v); onChange(v); };
  input.addEventListener('input', update); root.append(el); update(); return input;
}
export function button(root, label, fn, active = false) {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.className = 'control-button' + (active ? ' active' : '');
  b.addEventListener('click', () => fn(b)); root.append(b); return b;
}
export function choices(root, label, options, initial, fn) {
  const el = document.createElement('label'); el.className = 'select-control';
  const span = document.createElement('span'); span.textContent = label;
  const select = document.createElement('select');
  for (const [value, text] of options) { const option = document.createElement('option'); option.value = value; option.textContent = text; select.append(option); }
  select.value = initial; select.addEventListener('change', () => fn(select.value)); el.append(span, select); root.append(el); fn(initial); return select;
}
export function toggle(root, label, value, fn) {
  const el = document.createElement('label'); el.className = 'toggle-control';
  const input = document.createElement('input'); input.type = 'checkbox'; input.checked = value;
  const span = document.createElement('span'); span.textContent = label;
  input.addEventListener('change', () => fn(input.checked)); el.append(input, span); root.append(el); return input;
}
