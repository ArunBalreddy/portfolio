// Minimal pub/sub so real page interactions (clicks, scroll) can trigger the
// 3D request-flow animation without threading React state across the
// Canvas boundary.
type Listener = () => void;

const listeners = new Set<Listener>();

export function fireRequest() {
  listeners.forEach((listener) => listener());
}

export function onRequest(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
