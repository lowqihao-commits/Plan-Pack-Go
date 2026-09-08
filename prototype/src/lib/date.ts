const displayFormatter = new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
const shortFormatter = new Intl.DateTimeFormat('en-MY', { day: 'numeric', month: 'short' });

export function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function formatDate(value: string, short = false): string {
  const date = parseIsoDate(value);
  return date ? (short ? shortFormatter : displayFormatter).format(date) : '';
}

export function getTripLength(startValue: string, endValue: string) {
  const start = parseIsoDate(startValue);
  const end = parseIsoDate(endValue);
  if (!start || !end) return null;
  const difference = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return difference < 0 ? { valid: false, days: 0, nights: 0 } : { valid: true, days: difference + 1, nights: difference };
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
