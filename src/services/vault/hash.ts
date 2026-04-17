import { createHash } from 'node:crypto';

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hash8(input: string): string {
  return sha256(input).slice(0, 8);
}

/**
 * Canonicalize an object for stable hashing: sort keys recursively, drop
 * volatile fields like created_at so semantically-identical payloads hash equal.
 */
export function canonicalize(value: unknown, dropKeys: string[] = []): string {
  const skip = new Set(dropKeys);
  const walk = (v: unknown): unknown => {
    if (v === null || v === undefined) return null;
    if (Array.isArray(v)) return v.map(walk);
    if (typeof v === 'object') {
      const obj = v as Record<string, unknown>;
      const keys = Object.keys(obj).filter((k) => !skip.has(k)).sort();
      const out: Record<string, unknown> = {};
      for (const k of keys) out[k] = walk(obj[k]);
      return out;
    }
    return v;
  };
  return JSON.stringify(walk(value));
}
