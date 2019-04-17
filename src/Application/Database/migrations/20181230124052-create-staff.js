module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Staff', {
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
        as: 'company'
      }
    },
    staffId: {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'initial'
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
    },
    branchId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Branch',
        key: 'id',
        as: 'branch'
      }
    },
    supervisorId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'LineManagers',
        key: 'id',
        as: 'supervisor'
      }
    },
    bsmId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'LineManagers',
        key: 'id',
        as: 'BSM'
      }
    },
    roleId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Roles',
        key: 'id',
        as: 'role'
      }
    },
    changedPassword: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: queryInterface => queryInterface.dropTable('Staff')
};
