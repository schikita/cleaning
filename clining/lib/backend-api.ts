/**
 * Клиент для backend API. Вызывается только на сервере (getBackendUrl).
 */

function getBackendUrl(): string | null {
  const url = process.env.BACKEND_URL;
  return url ? url.replace(/\/$/, "") : null;
}

export async function fetchClientOrders(userId: string): Promise<
  Array<{
    id: string;
    title: string;
    status: string;
    budget: number | null;
    client_id: string;
    created_at: string | null;
  }>
> {
  const base = getBackendUrl();
  if (!base) return [];
  const res = await fetch(
    `${base}/api/v1/orders?client_id=${encodeURIComponent(userId)}&limit=100`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data;
}

export async function fetchUser(userId: string): Promise<{
  id: string;
  name: string;
  email: string;
  role: string;
  rating: number;
  completed_orders: number;
} | null> {
  const base = getBackendUrl();
  if (!base) return null;
  const res = await fetch(`${base}/api/v1/users/${encodeURIComponent(userId)}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPerformerOrders(performerId: string): Promise<
  Array<{
    id: string;
    title: string;
    status: string;
    budget: number | null;
  }>
> {
  const base = getBackendUrl();
  if (!base) return [];
  const res = await fetch(
    `${base}/api/v1/orders?performer_id=${encodeURIComponent(performerId)}&limit=100`,
    { next: { revalidate: 10 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data;
}
