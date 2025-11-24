export const API_BASE = (import.meta as any).env.VITE_API_BASE_URL as string;

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = buildUrl(path);
  const isFormData = init.body instanceof FormData;

  const headers = new Headers(init.headers || {});

  if (!isFormData && init.method !== "GET" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const opts: RequestInit = {
    method: init.method || "GET",
    credentials: "include",
    headers,
    body: init.body, // 🔥 penting!
  };

  // Stringify otomatis kalau object
  if (!isFormData && init.body && typeof init.body !== "string") {
    opts.body = JSON.stringify(init.body);
  }

  return fetch(url, opts);
}


export function apiGet(path: string, init: RequestInit = {}) {
  return apiFetch(path, { ...init, method: "GET" });
}

export function apiPost(path: string, body: any, init: RequestInit = {}) {
  return apiFetch(path, { ...init, method: "POST", body });
}

export function apiPut(path: string, body: any, init: RequestInit = {}) {
  return apiFetch(path, { ...init, method: "PUT", body });
}
