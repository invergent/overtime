import models from '../../database/models';

class BasicQuerier {
  static findByPk(tenantRef, model, pk, includes) {
    const options = { where: { tenantRef }, raw: true };
    if (includes) options.include = includes;
    return models[model].findByPk(pk, options);
  }

  static passwordResetQueries(tenantRef, method, staffId, data) {
    let options = { where: { tenantRef, staffId }, raw: true };
    if (method === 'destroy') options.returning = true;
    if (data) options = data;
    return models.PasswordResetRequest[method](options);
  }
}

export default BasicQuerier;
