import Exceljs from 'exceljs';
import GenericHelpers from '../GenericHelpers';
import AdministrationHelpers from '../AdministrationHelpers';
import { tenantsInfo, exportDocHeaders } from '../../utils/general';

const workbook = new Exceljs.Workbook();

class ExportDocHelpers {
  static async setWorkBookPropertiesAndCreateSheet(tenantRef) {
    workbook.creator = tenantsInfo[tenantRef].businessName;
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Submitted Claims');
    return worksheet;
  }

  static createDocColumnHeaders(worksheet) {
    const headerKey = GenericHelpers.createColumnHeaderKeys;

    const headerCreator = header => ({
      header, key: headerKey(header), width: 10, style: { font: { name: 'Arial' } }
    });
    const columnHeaders = exportDocHeaders.map(headerCreator);

    worksheet.columns = columnHeaders;
    worksheet.getRow(1).font = { bold: true };
    return worksheet;
  }

  static populateRowsWithClaimData(worksheet, claims) {
    claims.forEach((claim, index) => {
      const { firstname, lastname, middlename } = claim;
      const fullname = `${lastname} ${firstname}${middlename ? ' ' : ''}${middlename || ''}`;
      claim.sn = index + 1;
      claim.fullname = fullname;
      worksheet.addRow(claim);
    });
    return worksheet;
  }

  static async populateWorkbooksSheetWithData(tenantRef) {
    const claims = await AdministrationHelpers.exportableClaims(tenantRef);
    const preparedWorksheet = await ExportDocHelpers.setWorkBookPropertiesAndCreateSheet(tenantRef);
    const worksheetWithHeader = ExportDocHelpers.createDocColumnHeaders(preparedWorksheet);
    ExportDocHelpers.populateRowsWithClaimData(worksheetWithHeader, claims);
    return workbook;
  }
}

export default ExportDocHelpers;
