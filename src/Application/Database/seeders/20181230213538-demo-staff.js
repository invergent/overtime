const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Staff', [{
    tenantRef: 'INIT',
    staffId: 'ADMIN001',
    firstname: 'Peter',
    lastname: 'David',
    email: 'peter@viclawrence.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08012345678',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
