import models from '../../../../Database/models';
import { tenantsInfo } from '../../utils/general';

const { Tenants } = models;

class TenantService {
  static fetchAllTenants() {
    return Tenants.findAll({ raw: true });
  }

  static async mapForCors() {
    const tenants = await TenantService.fetchAllTenants();
    const tenantOrigins = tenants.map(tenant => tenant.url);
    return ['localhost:8000', 'localhost:4200', 'localhost:5000', 'https://vla-timer.herokuapp.com', ...tenantOrigins];
  }

  static async getTenantsList() {
    const tenants = await TenantService.fetchAllTenants();
    
    const reducer = (acc, tenant) => {
      const { businessName, emailAddress } = tenant;
      acc[tenant.ref] = { businessName, emailAddress };
      return acc;
    };

    return tenants.reduce(reducer, tenantsInfo);
  }
}

export default TenantService;
