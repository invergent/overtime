import Exceljs from 'excel4node';
import AdministrationHelpers from '../AdministrationHelpers';
import { tenantsInfo, exportDocHeaders } from '../../utils/general';

let workbook;

class ExportDocHelpers {
  static async setWorkBookPropertiesAndCreateSheet(tenantRef) {
    workbook = new Exceljs.Workbook({
      defaultFont: {
        size: 12,
        name: 'Arial',
        color: '000000',
      },
      author: tenantsInfo[tenantRef].businessName
    });
    
    const worksheet = workbook.addWorksheet('Submitted Claims');
    return worksheet;
  }

  static addRow(worksheet, row, rowValues) {
    rowValues.forEach((value, index) => {
      const oneIndexed = index + 1;
      const valueType = typeof value === 'object' ? 'string' : typeof value;
      worksheet.cell(row, oneIndexed)[valueType](value || '');
    });
    return worksheet;
  }

  static createDocColumnHeaders(worksheet, headerValues) {
    ExportDocHelpers.addRow(worksheet, 1, headerValues);
    return worksheet;
  }

  static populateRowsWithClaimData(worksheet, claims) {
    claims.forEach((claim, index) => {
      const currentRow = index + 1;
      claim.sn = currentRow;
      const claimValues = Object.values(claim);
      console.log(claimValues)
      ExportDocHelpers.addRow(worksheet, currentRow, claimValues);
    });
    return worksheet;
  }

  static async populateWorkbooksSheetWithData(tenantRef) {
    console.log('fetching claims...');
    const claims = await AdministrationHelpers.exportableClaims(tenantRef);
    console.log('Claims fetched!');
    console.log('Creating workbook...');
    const preparedWorksheet = await ExportDocHelpers.setWorkBookPropertiesAndCreateSheet(tenantRef);
    console.log('Workbook created!');
    console.log('Creating column headers...');
    const worksheetWithHeader = ExportDocHelpers.createDocColumnHeaders(preparedWorksheet, exportDocHeaders);
    console.log('Headers created!');
    console.log('Populating claims...');
    ExportDocHelpers.populateRowsWithClaimData(worksheetWithHeader, claims);
    console.log('Claims populated!');
    console.log('returning worksheet...');
    return workbook;
  }
}

export default ExportDocHelpers;
