import bcrypt from "bcryptjs";

export type UserRole = "performer" | "client" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  createdAt: Date;
}

// In-memory store (replace with database in production)
const users = new Map<string, AuthUser>();

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole = "client"
): Promise<AuthUser | null> {
  const normalizedEmail = email.toLowerCase().trim();
  if (users.has(normalizedEmail)) return null;
  const hash = await hashPassword(password);
  const id = crypto.randomUUID();
  const user: AuthUser = {
    id,
    email: normalizedEmail,
    name: name.trim(),
    role,
    passwordHash: hash,
    createdAt: new Date(),
  };
  users.set(normalizedEmail, user);
  return user;
}

export function getUserByEmail(email: string): AuthUser | undefined {
  return users.get(email.toLowerCase().trim());
}
