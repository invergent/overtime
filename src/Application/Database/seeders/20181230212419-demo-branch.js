module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Branch', [{
    solId: '2345',
    name: 'Oyin Jolayemi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    solId: '2715',
    name: 'Sanusi Fafunwa',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Branch')
};
