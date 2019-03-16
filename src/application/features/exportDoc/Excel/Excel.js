import Exceljs from 'exceljs';
import fs from 'fs';
import helpers from '../../../helpers';
import { tenantList, exportDocHeaders } from '../../../utils/general';

const { GenericHelpers, ClaimHelpers } = helpers;

const workbook = new Exceljs.Workbook();

class Excel {
  static setWorkBookPropertiesAndCreateSheet(tenant) {
    workbook.creator = tenantList[tenant];
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

  static async workbookData(tenant) {
    const claims = await ClaimHelpers.submittedClaimsForAdmin(tenant);
    const preparedWorksheet = Excel.setWorkBookPropertiesAndCreateSheet(tenant);
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
    const { tenant } = req;
    const workbookData = await Excel.workbookData(tenant);
    const pathToDocument = await Excel.createExcelDocument(workbookData);
    return [pathToDocument, `${tenant}ClaimReport.xlsx`];
  }
}

export default Excel;
