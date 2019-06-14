import TenantService from '../TenantService';

describe('TenantService Unit tests', () => {
  it('should fetch PasswordResetRequest', async () => {
    const tenants = [{ url: 'someUrl' }];
    jest.spyOn(TenantService, 'fetchAllTenants').mockResolvedValue(tenants);

    const origins = await TenantService.mapForCors();

    expect(origins.length).toBe(5);
    expect(origins[4]).toBe('someUrl');
  });
});
