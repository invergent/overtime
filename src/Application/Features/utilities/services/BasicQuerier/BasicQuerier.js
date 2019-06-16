import models from '../../../../Database/models';

class BasicQuerier {
  static findByPk(tenantRef, model, pk, includes, order) {
    const options = { where: { tenantRef } };
    if (includes) options.include = includes;
    if (order) options.order = order;
    return models[model].findByPk(pk, options);
  }

  static passwordResetQueries(method, staffId, data) {
    let options = { where: { staffId }, raw: true };
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

  static findAll(model, options) {
    return models[model].findAll(options);
  }
}

export default BasicQuerier;
