import Exceljs from 'exceljs';
import fs from 'fs';
import helpers from '../../../helpers';
import { tenantList, exportDocHeaders } from '../../../utils/general';

const { GenericHelpers, ClaimHelpers } = helpers;

const workbook = new Exceljs.Workbook();

class Excel {
  static setWorkBookPropertiesAndCreateSheet(tenantRef) {
    workbook.creator = tenantList[tenantRef];
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Submitted Claims');
    return worksheet;
  }

  static createDocColumnHeaders(worksheet) {
    const headerKey = GenericHelpers.createColumnHeaderKeys;

    const headerCreator = header => ({ header, key: headerKey(header), width: 10 });
    const columnHeaders = exportDocHeaders.map(headerCreator);

    worksheet.columns = columnHeaders;
    return worksheet;
  }

  static populateRowsWithClaimData(worksheet, claims) {
    claims.forEach((claim, index) => {
      claim.sn = index + 1;
      worksheet.addRow(claim);
    });
    return worksheet;
  }

  static async workbookData(tenantRef) {
    const claims = await ClaimHelpers.submittedClaimsForAdmin(tenantRef);
    const preparedWorksheet = Excel.setWorkBookPropertiesAndCreateSheet(tenantRef);
    const worksheetWithHeader = Excel.createDocColumnHeaders(preparedWorksheet);
    const populatedWorksheet = Excel.populateRowsWithClaimData(worksheetWithHeader, claims);
    return populatedWorksheet;
  }

  static async createExcelDocument() {
    const file = fs.createWriteStream('report.xlsx');
    await workbook.xlsx.write(file);
    return file.path;
  }

  static async claimReport(req) {
    const { tenantRef } = req;
    try {
      const workbookData = await Excel.workbookData(tenantRef);
      const pathToDocument = await Excel.createExcelDocument(workbookData);
      return [pathToDocument, `${tenantRef}ClaimReport.xlsx`];
    } catch (e) {
      return [500, 'An error occurred ERR500DWLEXL'];
    }
  }
}

export default Excel;
