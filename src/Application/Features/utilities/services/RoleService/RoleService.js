import BasicQuerier from "../BasicQuerier";

class RoleService {
  static fetchRoles() {
    return BasicQuerier.findAll('Roles');
  }
}

export default RoleService;