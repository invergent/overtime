import { Op } from 'sequelize';
import models from '../../../../Database/models';

class RoleService {
  static fetchRoles() {
    return models.Roles.findAll({ where: { name: { [Op.notILike]: '%ADMIN%' } } });
  }
}

export default RoleService;
