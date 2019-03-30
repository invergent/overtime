import Administration from '../Administration';
import helpers from '../../utilities/helpers';
import services from '../../utilities/services';
import { mockReq } from '../../../../__tests__/__mocks__';

const { AdministrationHelpers } = helpers;
const { StaffService } = services;

describe('Administration Unit Tests', () => {
  afterEach(() => jest.resetAllMocks());

  it('should catch errors if they occur while creating staff', async () => {
    jest.spyOn(AdministrationHelpers, 'convertStaffWorksheetToObjectsArray').mockReturnValue('value');
    jest.spyOn(StaffService, 'bulkCreateStaff').mockRejectedValue('value');

    const result = await Administration.createStaff(mockReq);

    expect(result[0]).toBe(500);
    expect(result).toHaveLength(3);
    expect(result[1]).toBe('There was an error creating staff ERR500CRTSTF.');
  });
});
