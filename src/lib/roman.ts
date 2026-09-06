/** 1 → I, 4 → IV, 34 → XXXIV. Used for lesson numbering in the manuscript-style lists. */
export function toRoman(n: number): string {
  if (n <= 0 || n >= 4000) return String(n)
  const table: Array<[number, string]> = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let out = ''
  for (const [v, s] of table) while (n >= v) { out += s; n -= v }
  return out
}
