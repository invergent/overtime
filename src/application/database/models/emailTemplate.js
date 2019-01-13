const emailTemplate = (sequelize, DataTypes) => {
  const EmailTemplate = sequelize.define('EmailTemplate', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    htmlMessage: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { freezeTableName: true });
  return EmailTemplate;
};

export default emailTemplate;
