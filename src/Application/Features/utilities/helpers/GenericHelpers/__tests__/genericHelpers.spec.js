import sequelize from 'sequelize';
import GenericHelpers from '../GenericHelpers';

describe('GenericHelpers Unit test', () => {
  it('should create pending claims query options', () => {
    jest.spyOn(sequelize, 'where').mockReturnValue('sequelize where');
    jest.spyOn(sequelize, 'cast').mockReturnValue('sequelize cast');
    jest.spyOn(sequelize, 'col').mockReturnValue('sequelize col');

    const options = GenericHelpers.fetchPendingClaimsOptions('tenantRef', 'status');

    expect(options.where.status).toBe('sequelize where');
  });
});
