import RoleService from "../utilities/services/RoleService";

class Roles {
  static async fetchRoles() {
    const roles = await RoleService.fetchRoles();
    return [200, 'Request successful!', roles];
  }
}

export default Roles;