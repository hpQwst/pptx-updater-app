import * as XLSX from "xlsx";

export interface ExcelSheetData {
  sheetName: string;
  title: string;
  data: any[][];
  headers: string[];
  rowCount: number;
  colCount: number;
}

export interface ExcelAnalysis {
  fileName: string;
  sheetCount: number;
  sheets: ExcelSheetData[];
  identifiedMetrics: string[];
}

/**
 * Analyzes Excel file structure and extracts data
 */
export async function analyzeExcelFile(buffer: Buffer): Promise<ExcelAnalysis> {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheets: ExcelSheetData[] = [];
    const identifiedMetrics = new Set<string>();

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }) as any[][];

      // Extract title from second row (usually B1 or similar)
      let title = "";
      if (data.length > 0 && data[0].length > 1) {
        title = String(data[0][1] || "").trim();
      }

      // Identify metrics in the sheet
      const sheetContent = data.flat().join(" ").toLowerCase();
      if (sheetContent.includes("nps")) identifiedMetrics.add("NPS");
      if (sheetContent.includes("regional")) identifiedMetrics.add("Regional");
      if (sheetContent.includes("contribuição")) identifiedMetrics.add("Contribuição");
      if (sheetContent.includes("csat")) identifiedMetrics.add("CSAT");
      if (sheetContent.includes("base abs")) identifiedMetrics.add("Base");

      sheets.push({
        sheetName,
        title,
        data,
        headers: data.length > 0 ? data[0].map(h => String(h)) : [],
        rowCount: data.length,
        colCount: data.length > 0 ? Math.max(...data.map(r => r.length)) : 0,
      });
    }

    return {
      fileName: "unknown.xlsx",
      sheetCount: workbook.SheetNames.length,
      sheets,
      identifiedMetrics: Array.from(identifiedMetrics),
    };
  } catch (error) {
    console.error("Error analyzing Excel file:", error);
    throw new Error(`Failed to analyze Excel file: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Extracts data from a specific range in Excel
 */
export function extractExcelRange(sheet: ExcelSheetData, range: string): any[][] {
  // Parse range like "A1:D10"
  const [start, end] = range.split(":");
  if (!start || !end) return [];

  const startCol = start.charCodeAt(0) - 65;
  const startRow = parseInt(start.slice(1)) - 1;
  const endCol = end.charCodeAt(0) - 65;
  const endRow = parseInt(end.slice(1)) - 1;

  const result = [];
  for (let r = startRow; r <= endRow && r < sheet.data.length; r++) {
    const row = [];
    for (let c = startCol; c <= endCol && c < sheet.data[r].length; c++) {
      row.push(sheet.data[r][c] || "");
    }
    result.push(row);
  }
  return result;
}

/**
 * Finds a specific value in Excel sheet and returns its position
 */
export function findValueInSheet(sheet: ExcelSheetData, searchValue: string): { row: number; col: number } | null {
  const search = searchValue.toLowerCase();
  for (let r = 0; r < sheet.data.length; r++) {
    for (let c = 0; c < sheet.data[r].length; c++) {
      if (String(sheet.data[r][c]).toLowerCase().includes(search)) {
        return { row: r, col: c };
      }
    }
  }
  return null;
}
