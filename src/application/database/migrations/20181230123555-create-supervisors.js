module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Supervisors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    supervisorId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    middleName: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Supervisors')
};
