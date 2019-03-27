import ClaimService from '../ClaimService';
import GenericHelpers from '../../../helpers/GenericHelpers';
import models from '../../../database/models';

describe('ClaimService Unit test', () => {
  it('should fetch claims based on the options passed', () => {
    const findAllFn = jest.spyOn(models.Claims, 'findAll').mockReturnValue('found all');
    const optionsFn = jest.spyOn(GenericHelpers, 'fetchPendingClaimsOptions').mockReturnValue('options');

    const claims = ClaimService.fetchClaimsByTenantRef('tenantRef', 'reciepients', 'notificationType');

    expect(findAllFn).toHaveBeenCalled();
    expect(optionsFn).toHaveBeenCalled();
    expect(claims).toBe('found all');
  });
});
