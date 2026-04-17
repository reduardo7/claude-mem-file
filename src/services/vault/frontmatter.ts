import { parse as yamlParse, stringify as yamlStringify } from 'yaml';

const DELIM = '---';
const FM_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

export interface ParsedFrontmatter<T> {
  data: T;
  body: string;
}

export function parseFrontmatter<T = Record<string, unknown>>(raw: string): ParsedFrontmatter<T> {
  const match = raw.match(FM_RE);
  if (!match) {
    return { data: {} as T, body: raw };
  }
  const [, fm, body] = match;
  const data = (yamlParse(fm) ?? {}) as T;
  return { data, body: body ?? '' };
}

export function stringifyFrontmatter(data: Record<string, unknown>, body: string = ''): string {
  const fm = yamlStringify(data).trimEnd();
  const b = body.startsWith('\n') ? body : body ? `\n${body}` : '';
  return `${DELIM}\n${fm}\n${DELIM}\n${b.replace(/^\n+/, '\n')}`;
}
