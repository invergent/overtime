class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middleName, email: emailAddress, image, changedPassword
    } = user;
    const branch = user.branch ? user.branch.name : null;
    const role = user.role ? user.role.name : null;
    let supervisorFirstName = null;
    let supervisorLastName = null;
    let supervisorEmailAddress = null;
    let bsmFirstName = null;
    let bsmLastName = null;
    let bsmEmailAddress = null;
    
    if (user.supervisor) {
      supervisorFirstName = user.supervisor.firstname;
      supervisorLastName = user.supervisor.lastname;
      supervisorEmailAddress = user.supervisor.email;
    }
    if (user.BSM) {
      bsmFirstName = user.BSM.firstname;
      bsmLastName = user.BSM.lastname;
      bsmEmailAddress = user.BSM.email;
    }
    
    return {
      staffId,
      firstname,
      lastname,
      middleName,
      emailAddress,
      image,
      role,
      branch,
      changedPassword,
      supervisorFirstName,
      supervisorLastName,
      supervisorEmailAddress,
      bsmFirstName,
      bsmLastName,
      bsmEmailAddress
    };
  }
}

export default UsersHelpers;
