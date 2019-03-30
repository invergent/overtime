import models from '../../../../Database/models';

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

  static update(tenantRef, model, updatePayload, id) {
    const options = { where: { tenantRef }, returning: true, raw: true };
    if (id) options.where.id = id;
    return models[model].update(updatePayload, options);
  }

  static bulkCreate(model, list) {
    return models[model].bulkCreate(list, { returning: true, raw: true, plain: false });
  }
}

export default BasicQuerier;
