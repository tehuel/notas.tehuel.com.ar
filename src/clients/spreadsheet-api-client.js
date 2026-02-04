import { fetcher } from "./base-api-client.js";

const OPENSHEET_BASE = "https://opensheet.elk.sh";

/**
 * Fetches all data from the spreadsheet
 * @param {string} spreadsheetId - The spreadsheet ID
 * @param {string} sheetName - The sheet name
 * @returns {Promise<Array>} Array of spreadsheet rows
 * @throws {Error} If fetch fails or data is invalid
 */
async function getSpreadsheetData(spreadsheetId, sheetName) {
  if (!spreadsheetId || !sheetName) {
    throw new Error("Spreadsheet ID and sheet name are required");
  }

  const data = await fetcher(`${OPENSHEET_BASE}/${spreadsheetId}/${sheetName}`);

  if (!Array.isArray(data)) {
    throw new Error("Invalid spreadsheet data: expected an array");
  }

  return data;
}

/**
 * Finds a student record by GitHub username
 * @param {string} username - GitHub username
 * @param {string} spreadsheetId - The spreadsheet ID
 * @param {string} sheetName - The sheet name
 * @returns {Promise<Object>} Student data
 * @throws {Error} If student not found or fetch fails
 */
export async function getStudentByUsername(username, spreadsheetId, sheetName) {
  if (!username) throw new Error("Username is required");

  const data = await getSpreadsheetData(spreadsheetId, sheetName);
  const student = data.find((row) => row.Usuario === username);

  if (!student) {
    throw new Error(`Student not found for username: ${username}`);
  }

  return student;
}
