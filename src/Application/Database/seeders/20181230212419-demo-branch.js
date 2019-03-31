module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Branch', [{
    solId: '2345',
    branchName: 'Oyin Jolayemi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    solId: '2715',
    branchName: 'Sanusi Fafunwa',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Branch')
};
