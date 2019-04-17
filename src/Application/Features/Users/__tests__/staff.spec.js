import Staff from '../Staff';
import StaffService from '../../utilities/services/StaffService';
import ActivityService from '../../utilities/services/ActivityService';
import ClaimHelpers from '../../utilities/helpers/ClaimHelpers';
import { mockReq } from '../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail');

describe('Users Unit Test', () => {
  describe('staff Dashboard data', () => {
    it('should fail if an error occurs while attempting to fetch dashboard details.', async () => {
      jest.spyOn(ClaimHelpers, 'fetchStaffPendingClaim').mockRejectedValue('err');

      const result = await Staff.dashboardData(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('An error occurred ERR500DSHBOD.');
    });
  });

  describe('staff activities', () => {
    it('should fail if an error occurs while attempting to fetch staff activities.', async () => {
      jest.spyOn(ActivityService, 'fetchActivities').mockRejectedValue('err');

      const result = await Staff.activities(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('An error occurred ERR500ACTVTY.');
    });
  });

  describe('staff profile Data', () => {
    it('should fail if an error occurs while attempting to fetch profile data.', async () => {
      jest.spyOn(StaffService, 'fetchStaffByPk').mockRejectedValue('err');

      const result = await Staff.profileData(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('An error occurred ERR500PROFIL.');
    });
  });
});
