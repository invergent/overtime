module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Branch', [{
    solId: '2345',
    name: 'Oyin Jolayemi',
    address: 'Plot 156, Oyin Jolayemi street, Victoria Island, Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    solId: '2715',
    name: 'Sanusi Fafunwa',
    address: 'Plot 345, Sanusi Fafunwa street, Victoria Island, Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Branch')
};
