// Semantic events emitted only by confirmed UI actions, never by slider updates.
export function soundFeedback(name){window.dispatchEvent(new CustomEvent('physics:sound',{detail:{name}}));}
