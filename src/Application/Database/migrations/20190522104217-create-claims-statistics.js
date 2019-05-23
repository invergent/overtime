module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ClaimsStatistics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tenantRef: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Tenants',
        key: 'ref',
        as: 'companyStats'
      }
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Jan: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Feb: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Mar: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Apr: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    May: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Jun: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Jul: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Aug: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Sep: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Oct: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Nov: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    Dec: {
      type: Sequelize.INTEGER,
      defaultValue: null
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
  down: queryInterface => queryInterface.dropTable('ClaimsStatistics')
};
