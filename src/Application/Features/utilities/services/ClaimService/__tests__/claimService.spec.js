import ClaimService from '../ClaimService';
import GenericHelpers from '../../../helpers/GenericHelpers';
import models from '../../../../../Database/models';

describe('ClaimService Unit test', () => {
  it('should fetch claims based on the options passed', () => {
    const findAllFn = jest.spyOn(models.Claims, 'findAll').mockReturnValue('found all');
    const optionsFn = jest.spyOn(GenericHelpers, 'fetchPendingClaimsOptions').mockReturnValue('options');

    const claims = ClaimService.fetchClaimsByTenantRef('tenantRef', 'reciepients', 'notificationType');

    expect(findAllFn).toHaveBeenCalled();
    expect(optionsFn).toHaveBeenCalled();
    expect(claims).toBe('found all');
  });

  it('should update chart statistics', () => {
    const findAllFn = jest.spyOn(models.ClaimsStatistics, 'update').mockReturnValue('updated');

    const claims = ClaimService.updateChartStatistics('tenantRef', 'payload');

    expect(findAllFn).toHaveBeenCalled();
    expect(claims).toBe('updated');
  });

  it('should create a new chart statistics if current month is January', () => {
    const findAllFn = jest.spyOn(models.ClaimsStatistics, 'create').mockReturnValue('created');

    const claims = ClaimService.createChartStatistics('payload');

    expect(findAllFn).toHaveBeenCalledWith('payload');
    expect(claims).toBe('created');
  });
});
