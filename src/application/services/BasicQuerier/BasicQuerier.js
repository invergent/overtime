import tenantsModels from '../../database/tenantsModels';

class BasicQuerier {
  static findByPk(tenant, model, pk, includes) {
    const options = { raw: true };
    if (includes) options.include = includes;
    return tenantsModels[tenant][model].findByPk(pk, options);
  }

  static passwordResetQueries(tenant, method, staffId, data) {
    let options = { where: { staffId }, raw: true };
    if (method === 'destroy') options.returning = true;
    if (data) options = data;
    return tenantsModels[tenant].PasswordResetRequest[method](options);
  }
}

export default BasicQuerier;
