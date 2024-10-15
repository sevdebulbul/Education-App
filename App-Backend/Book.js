const xlsx = require('xlsx');
const fs = require('fs');

const dataPathExcel = "./../assets/excel/EducationAppDataSheet.xlsx";

const wb = xlsx.readFile(dataPathExcel);


for (let i = 1; i <= 9; i++) {
  const sheetName = wb.SheetNames[i]; 
  const sheetValue = wb.Sheets[sheetName];


  const excelData = xlsx.utils.sheet_to_json(sheetValue);

 
  const jsonFilePath = `./outputData_sheet${i}.json`; 
  fs.writeFile(jsonFilePath, JSON.stringify(excelData, null, 2), (err) => {
    if (err) {
      console.error(`JSON dosyası sheet${i} yazılırken hata oluştu:`, err);
    } else {
      console.log(`Veriler sheet${i} başarıyla JSON dosyasına yazıldı!`);
    }
  });
}
