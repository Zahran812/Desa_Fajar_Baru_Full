export const API_BASE = (import.meta as any).env.VITE_API_BASE_URL as string;

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = buildUrl(path);
  const opts: RequestInit = {
    credentials: init.credentials ?? 'include',
    ...init,
  };
  return fetch(url, opts);
}

export function apiGet(path: string, init: RequestInit = {}) {
  return apiFetch(path, { ...init, method: 'GET' });
}

export function apiPost(path: string, body: any, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  if (!(body instanceof FormData)) headers.set('Content-Type', 'application/json');
  return apiFetch(path, { ...init, method: 'POST', headers, body: body instanceof FormData ? body : JSON.stringify(body) });
}

export function apiPut(path: string, body: any, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  if (!(body instanceof FormData)) headers.set('Content-Type', 'application/json');
  return apiFetch(path, { ...init, method: 'PUT', headers, body: body instanceof FormData ? body : JSON.stringify(body) });
}
