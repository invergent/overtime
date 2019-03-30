import fs from 'fs';
import ExportDocHelpers from '../../utilities/helpers/ExportDocHelpers';

class Excel {
  static async createExcelDocument(workbook) {
    const file = fs.createWriteStream('report.xlsx');
    await workbook.xlsx.write(file);
    return file.path;
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
