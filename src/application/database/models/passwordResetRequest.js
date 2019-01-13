const passwordResetRequest = (sequelize, DataTypes) => {
  const PasswordResetRequest = sequelize.define('PasswordResetRequest', {
    staffId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    passwordResetHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { freezeTableName: true });
  return PasswordResetRequest;
};

export default passwordResetRequest;
