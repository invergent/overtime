import ClaimHelpers from '../ClaimHelpers';
import {
  mockStaffWithPendingClaims, mockFilteredStaffWithPendingClaims
} from '../../../../__tests__/__mocks__';

describe('ClaimHelpers Unit test', () => {
  it('should create a new array with objects', async () => {
    const newArray = ClaimHelpers.filterReminderPendingClaims(mockStaffWithPendingClaims);

    expect(newArray).toEqual(mockFilteredStaffWithPendingClaims);
  });
});
