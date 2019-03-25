import bcrypt from 'bcrypt';

const staff = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    tenantRef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'initial'
    },
    image: {
      type: DataTypes.STRING
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supervisorId: {
      type: DataTypes.INTEGER
    },
    bsmId: {
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });

  Staff.associate = (models) => {
    Staff.belongsTo(models.Tenants, { as: 'company', foreignKey: 'tenantRef' });
    Staff.belongsTo(models.LineManagers, { as: 'supervisor', foreignKey: 'supervisorId' });
    Staff.belongsTo(models.LineManagers, { as: 'BSM', foreignKey: 'bsmId' });
    Staff.belongsTo(models.Branch, { foreignKey: 'branchId' });
    Staff.belongsTo(models.Roles, { as: 'staffRole', foreignKey: 'role' });
    Staff.hasMany(models.Claims, { foreignKey: 'requester' });
    Staff.hasMany(models.Notifications, { as: 'notifications', foreignKey: 'userId' });
  };

  Staff.beforeValidate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  return Staff;
};

export default staff;
