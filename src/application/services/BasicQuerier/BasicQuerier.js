import tenantsModels from '../../database/tenantsModels';

class BasicQuerier {
  static findByPk(tenant, model, pk) {
    return tenantsModels[tenant][model].findByPk(pk, { raw: true });
  }

  static passwordResetQueries(tenant, method, staffId, data) {
    let options = { where: { staffId }, raw: true };
    if (method === 'destroy') options.returning = true;
    if (data) options = data;
    return tenantsModels[tenant].PasswordResetRequest[method](options);
  }
}

export default BasicQuerier;
