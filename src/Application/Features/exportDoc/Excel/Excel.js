import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import ExportDocHelpers from '../../utilities/helpers/ExportDocHelpers';

class Excel {
  static async createExcelDocument(workbook) {
    // const workbookBuffer = await workbook.writeToBuffer();
    // fs.writeFile('report.xlsx', workbookBuffer);

    // const workbookBuffer = XLSX.write(workbook, { bookType:'xlsx', bookSST:true, type:'buffer' });
    // fs.writeFile('report.xlsx', workbookBuffer);
    XLSX.writeFile(workbook, 'report.xlsx');

    const pathToDocument = path.resolve(`${__dirname.split('/src')[0]}`, 'report.xlsx');
    console.log(pathToDocument);
    return pathToDocument;
  }

  static async claimReport(req) {
    const { tenantRef } = req;
    try {
      const populatedWorkbook = await ExportDocHelpers.populateWorkbooksSheetWithData(tenantRef);
      const pathToDocument = await Excel.createExcelDocument(populatedWorkbook);
      return [pathToDocument, `${tenantRef}ClaimReport.xlsx`];
    } catch (e) {
      return [500, 'An error occurred ERR500DWLEXL'];
    }
  }
}

export default Excel;
