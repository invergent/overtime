import Exceljs from 'exceljs';
import GenericHelpers from '../GenericHelpers';
import AdministrationHelpers from '../AdministrationHelpers';
import { tenantList, exportDocHeaders } from '../../utils/general';

const workbook = new Exceljs.Workbook();

class ExportDocHelpers {
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

  static async populateWorkbooksSheetWithData(tenantRef) {
    const claims = await AdministrationHelpers.submittedClaimsForAdmin(tenantRef);
    const preparedWorksheet = ExportDocHelpers.setWorkBookPropertiesAndCreateSheet(tenantRef);
    const worksheetWithHeader = ExportDocHelpers.createDocColumnHeaders(preparedWorksheet);
    ExportDocHelpers.populateRowsWithClaimData(worksheetWithHeader, claims);
    return workbook;
  }
}

export default ExportDocHelpers;
