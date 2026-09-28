export function downloadCSV<T extends Record<string, any>>(filename: string, rows: T[]) {
  if (!rows.length) return;
  
  const headers = Object.keys(rows[0]) as (keyof T)[];
  const escape = (v: any) =>
    `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;

  const csv =
    headers.join(",") +
    "\n" +
    rows
      .map((r) => headers.map((h) => escape(r[h])).join(","))
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
