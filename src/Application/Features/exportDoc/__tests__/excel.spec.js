import Excel from '../Excel';
import ExportDocHelpers from '../../utilities/helpers/ExportDocHelpers';

describe('Excel Unit Tests', () => {
  it('should fail if an error occurs', async () => {
    jest.spyOn(ExportDocHelpers, 'populateWorkbooksSheetWithData').mockRejectedValue('err');
    jest.spyOn(Excel, 'createExcelDocument');

    const result = await Excel.claimReport('req');

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(500);
    expect(result[1]).toBe('An error occurred ERR500DWLEXL');
  });
});
