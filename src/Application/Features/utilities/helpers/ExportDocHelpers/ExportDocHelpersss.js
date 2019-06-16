import XLSX from 'xlsx';
import AdministrationHelpers from '../AdministrationHelpers';
import GenericHelpers from '../GenericHelpers';
import { tenantsInfo, exportDocHeaders } from '../../utils/general';

let workbook;

const headerKeys = GenericHelpers.createColumnHeaderKeys;

class ExportDocHelpers {
  static createAndSetWorkBookProperties(tenantRef) {
    workbook = XLSX.utils.book_new();
    console.log('... what')
    // workbook.Props.Author = tenantsInfo[tenantRef].businessName;
    // console('ta gwan ....')
    // workbook.Props.CreatedDate = new Date();
    // console.log('murray....')
  }

  static appendWorksheetToWorkbook(worksheet, worksheetName) {
    return XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  }

  static createWorksheetHeaders(headerValues) {
    return headerValues.map(value => headerKeys(value));
  }

  static formatWorksheetHeaders(worksheet, columnHeaders) {
    console.log('exportDocHeaders', columnHeaders)
    columnHeaders.forEach((header, index) => {
      const alphabetCode = String.fromCharCode(65 + index);
      console.log('alphacode', alphabetCode)
      worksheet[`${alphabetCode}1`].v = header;
    });
    return worksheet;
  }

  static populateRowsWithClaimData(claims) {
    // add serial number to each claim object
    claims.map((claim, index) => {
      const currentRow = index + 1;
      claim.sn = currentRow;
      return claim;
    });

    // create and populate worksheet with claims data
    return XLSX.utils.json_to_sheet(claims, {
      header: ExportDocHelpers.createWorksheetHeaders(exportDocHeaders),
      skipHeader: true,
      origin: 'A2'
    });
  }

  static async populateWorkbooksSheetWithData(tenantRef) {
    console.log('Creating workbook...');
    ExportDocHelpers.createAndSetWorkBookProperties(tenantRef);
    console.log('Workbook created!');
    console.log('fetching claims...');
    const claims = await AdministrationHelpers.exportableClaims(tenantRef);
    console.log('Headers created!');
    console.log('Populating claims...');
    const populatedWorksheet = ExportDocHelpers.populateRowsWithClaimData(claims);
    console.log('Claims populated!');
    // console.log('Formatting headers...');
    // const formattedWorksheet = ExportDocHelpers.formatWorksheetHeaders(populatedWorksheet, exportDocHeaders);
    // console.log('Headers formatted!');
    console.log('Appending worksheet to workbook...');
    // append worksheet to workbook
    ExportDocHelpers.appendWorksheetToWorkbook(populatedWorksheet, 'Submitted Claims');
    console.log('Worksheet appended!');
    console.log('returning workbook...');
    return workbook;
  }
}

export default ExportDocHelpers;
