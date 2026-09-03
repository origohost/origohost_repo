/**
 * Converts an array of objects into a CSV string and triggers a file download in the browser.
 * @param data Array of objects to export
 * @param filename Name of the file to be downloaded (without .csv extension)
 */
export function exportToCSV<T extends Record<string, any>>(data: T[], filename: string) {
  if (!data || !data.length) {
    console.warn("No data available to export");
    return;
  }

  // Extract headers
  const headers = Object.keys(data[0]);

  // Format rows
  const csvRows = data.map((row) => {
    return headers
      .map((fieldName) => {
        let cellData =
          row[fieldName] === null || row[fieldName] === undefined ? "" : String(row[fieldName]);
        // Escape quotes and wrap in quotes if contains commas or newlines
        if (cellData.includes(",") || cellData.includes("\n") || cellData.includes('"')) {
          cellData = `"${cellData.replace(/"/g, '""')}"`;
        }
        return cellData;
      })
      .join(",");
  });

  // Combine headers and rows
  const csvString = [headers.join(","), ...csvRows].join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
