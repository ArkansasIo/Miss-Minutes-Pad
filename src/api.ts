const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export type ApiOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>;
};

export async function ajax<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { query, headers, ...requestInit } = options;
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    ...requestInit,
    headers: {
      Accept: 'application/json',
      ...(requestInit.body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || `AJAX request failed: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  health: () => ajax<{ status: string; service?: string }>('/api/health'),
  chat: (message: string) =>
    ajax<{ reply: string }>('/api/agent/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  conversations: () => ajax<unknown[]>('/api/conversations'),
  memories: () => ajax<unknown[]>('/api/memories'),
  timeline: () => ajax<unknown[]>('/api/timeline'),
  plugins: () => ajax<unknown[]>('/api/plugins'),
};
