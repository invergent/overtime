class ModelsCache {
  constructor(tenantsArray, dbConfigFunction, createSequelizeModelsFunction) {
    this.config = dbConfigFunction;
    this.tenants = tenantsArray;
    this.createSequelizeModels = createSequelizeModelsFunction;

    this.copyDbModelsForEachTenant(this.tenants);
  }

  createModels(tenant) {
    const dbConfig = this.config(tenant);
    return this.createSequelizeModels(dbConfig);
  }

  copyDbModelsForEachTenant(listOfTenants) {
    listOfTenants.forEach((tenant) => {
      const tenantSequelizeModel = this.createModels(tenant);
      this[tenant] = tenantSequelizeModel;
    });
  }
}

export default ModelsCache;
