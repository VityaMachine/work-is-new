const DEFAULT_CSV_HEADERS = [
  "column1",
  "column2",
  "column3",
  "column4",
  "column5",
];

export function parseCSV(text, options = {}) {
  const { hasHeaders = true, delimiter = ";" } = options;

  const rows = text
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((row) => row.split(delimiter).map((cell) => cell.trim()));

  if (!rows.length) {
    return [];
  }

  const headers = hasHeaders
    ? rows[0]
    : DEFAULT_CSV_HEADERS.slice(0, rows[0].length);

  const dataRows = hasHeaders ? rows.slice(1) : rows;

  return dataRows.map((row) => {
    const item = {};

    headers.forEach((header, index) => {
      item[header] = row[index] ?? "";
    });

    return item;
  });
}
