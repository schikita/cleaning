/** Временное хранилище кодов для входа по email.
 * В продакшене лучше использовать Redis/БД с TTL.
 */

const CODE_TTL_MS = 10 * 60 * 1000; // 10 минут

interface StoredCode {
  code: string;
  expiresAt: number;
}

const store = new Map<string, StoredCode>();

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function setCode(email: string, code: string): void {
  const key = normalizeEmail(email);
  store.set(key, {
    code,
    expiresAt: Date.now() + CODE_TTL_MS,
  });
}

export function verifyAndConsumeCode(email: string, code: string): boolean {
  const key = normalizeEmail(email);
  const entry = store.get(key);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return false;
  }
  if (entry.code !== code.trim()) return false;
  store.delete(key);
  return true;
}

export function isValidCode(email: string, code: string): boolean {
  const key = normalizeEmail(email);
  const entry = store.get(key);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) return false;
  return entry.code === code.trim();
}

