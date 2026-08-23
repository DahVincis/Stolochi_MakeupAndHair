/**
 * Minimal RFC 4180 CSV parser.
 *
 * Google's CSV export quotes every field, escapes embedded quotes by doubling
 * them, and keeps commas and newlines inside quoted fields — so splitting on
 * "," would corrupt any testimonial containing a comma.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  let dirty = false; // saw any character on this row, so a blank last field counts

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char !== '"') {
        field += char;
      } else if (text[i + 1] === '"') {
        field += '"'; // "" is a literal quote
        i++;
      } else {
        quoted = false;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
      dirty = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
      dirty = true;
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      dirty = false;
    } else if (char !== "\r") {
      field += char;
      dirty = true;
    }
  }

  if (dirty || field !== "") {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
