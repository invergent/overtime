import Claim from '../Claim';
import ClaimService from '../../utilities/services/ClaimService';
import ClaimHelpers from '../../utilities/helpers/ClaimHelpers';
import { mockReq } from '../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail');

describe('Claim Unit Test', () => {
  describe('runClaimApproval', () => {
    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(Claim, 'checkThatClaimIsAssignedToLineManager').mockResolvedValue([200, 'okay']);
      jest.spyOn(ClaimService, 'approveClaim').mockResolvedValue([false, {}]);

      const result = await Claim.runClaimApproval(mockReq, 'Approved');

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not approved.');
    });
  });

  describe('cancelClaim', () => {
    it('should send a non-approval message if approval was not updated on the DB.', async () => {
      jest.spyOn(ClaimService, 'cancelClaim').mockResolvedValue([false, {}]);

      const result = await Claim.cancel(mockReq);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(200);
      expect(result[1]).toEqual('Claim not cancelled.');
    });

    it('should send a 500 fail response if an error occurs while cancelling claim.', async () => {
      jest.spyOn(ClaimService, 'cancelClaim').mockRejectedValue('err');

      const result = await Claim.cancel(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem cancelling your claim ERR500CLMCNL.');
    });
  });

  describe('submittedClaims', () => {
    it('should send a 500 fail response if an error occurs while fetching claims.', async () => {
      jest.spyOn(ClaimHelpers, 'submittedClaimsForAdmin').mockRejectedValue('err');

      const result = await Claim.submittedClaims(mockReq);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(500);
      expect(result[1]).toEqual('There was a problem fetching claims ERR500ADMCLM.');
    });
  });
});
