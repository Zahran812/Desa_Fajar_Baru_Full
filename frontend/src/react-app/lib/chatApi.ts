import { apiFetch } from '@/react-app/lib/api';

export type ChatCategory = {
  id: number;
  key: string;
  label: string;
};

export type ChatThread = {
  id: number;
  subject: string;
  category: ChatCategory;
  citizen: { id: number; full_name: string; role: string };
  operator: { id: number; full_name: string; role: string };
  updated_at: string;
  last_message: null | {
    id: number;
    sender_user_id: number;
    content: string;
    created_at: string;
  };
  unread_count: number;
};

export type ChatMessage = {
  id: number;
  chat_thread_id?: number;
  sender_user_id: number;
  content: string;
  created_at: string;
  updated_at?: string;
};

type PaginatedMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export async function fetchChatCategories(token: string) {
  const res = await apiFetch('/chat/categories', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return (json.data || []) as ChatCategory[];
}

export async function fetchChatThreads(token: string) {
  const res = await apiFetch('/chat/threads', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return {
    data: (json.data || []) as ChatThread[],
    meta: (json.meta || null) as PaginatedMeta | null,
  };
}

export async function createChatThread(token: string, payload: { chat_category_id: number; subject: string; message: string }) {
  const res = await apiFetch('/chat/threads', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: payload as unknown as BodyInit,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchChatMessages(token: string, threadId: number, perPage = 30) {
  const res = await apiFetch(`/chat/threads/${threadId}/messages?per_page=${perPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return {
    data: (json.data || []) as ChatMessage[],
    meta: (json.meta || null) as PaginatedMeta | null,
  };
}

export async function sendChatMessage(token: string, threadId: number, content: string) {
  const res = await apiFetch(`/chat/threads/${threadId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: { content } as unknown as BodyInit,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function markChatRead(token: string, threadId: number) {
  const res = await apiFetch(`/chat/threads/${threadId}/mark-read`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
