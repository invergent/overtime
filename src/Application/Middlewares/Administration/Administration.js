import Exceljs from 'exceljs';
import Validator from '../InputValidator/Validator';

class AdministrationMiddleware {
  static async getWorksheetFromExcelFile(data) {
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(1);
    return worksheet;
  }

  static checkRowValues(worksheet) {
    const rowsWithErrors = [];

    worksheet.eachRow((row, index) => {
      const { rowIsValid, errors } = Validator.staff(row.values);
      if (!rowIsValid) rowsWithErrors.push({ line: index, errors });
    });

    return rowsWithErrors;
  }

  static async validateExcelValues(req, res, next) {
    const { files: { excelDoc: { data } } } = req;

    try {
      const worksheet = await AdministrationMiddleware.getWorksheetFromExcelFile(data);
      const rowsWithErrors = AdministrationMiddleware.checkRowValues(worksheet);
      if (rowsWithErrors.length) {
        return res.status(400).json({
          message: `${rowsWithErrors.length} rows contain errors.`,
          rowsWithErrors
        });
      }
      req.worksheet = worksheet;
      return next();
    } catch (e) {
      return res.status(500).json({
        message: `An error occurred while processing your request.${''
        } This could be a problem with the file you uploaded.`
      });
    }
  }
}

export default AdministrationMiddleware;
