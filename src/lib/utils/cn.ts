/** Minimal class-name joiner. No runtime dependency — keeps the bundle honest. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}
