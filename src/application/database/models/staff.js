import bcrypt from 'bcrypt';

const staff = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
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
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { freezeTableName: true });

  Staff.associate = (models) => {
    Staff.belongsTo(models.Supervisor, { foreignKey: 'id' });
    Staff.belongsTo(models.Branch, { foreignKey: 'id' });
  };

  Staff.beforeValidate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });
  Staff.checkPassword = (password, user) => bcrypt.compareSync(password, user);
  return Staff;
};

export default staff;
