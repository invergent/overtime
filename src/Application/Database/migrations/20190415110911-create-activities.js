module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Activities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    activity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    staffId: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Staff',
        key: 'staffId',
        as: 'staff'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('Activities')
};
