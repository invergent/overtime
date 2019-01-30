const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Staff', [{
    staffId: 'TN012345',
    firstname: 'John',
    lastname: 'Doe',
    middleName: 'Doey',
    email: 'john.doe@viclawrence.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    branchId: 1,
    supervisorId: 1,
    role: 1,
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    staffId: 'TN046345',
    firstname: 'Jane',
    lastname: 'Doe',
    middleName: 'Janny',
    email: 'jane.doe@viclawrence.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    branchId: 2,
    supervisorId: 1,
    role: 2,
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    staffId: 'TN032375',
    firstname: 'Mercy',
    lastname: 'Brawl',
    middleName: 'Brown',
    email: 'mercy.brown@viclawrence.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    branchId: 1,
    supervisorId: 2,
    role: 3,
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
