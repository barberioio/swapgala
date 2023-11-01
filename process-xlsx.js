const XLSX = require('xlsx');
// const excelFilePath = './capstone.xlsx';

function findValueInExcel(excelFilePath, conditionArray) {
  // Load the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];

  // Get the sheet as a 2D array
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

  let foundValue = null;

  for (const row of sheet) {
    const rowData = row.slice(0, conditionArray.length); 
    if (JSON.stringify(rowData) === JSON.stringify(conditionArray)) {
      foundValue = row[conditionArray.length];
      break;
    }
  }

  return foundValue;
}

module.exports = { findValueInExcel };
