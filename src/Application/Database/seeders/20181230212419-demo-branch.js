module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Branch', [{
    solId: '2345',
    branchName: 'Oyin Jolayemi',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  },
  {
    solId: '2715',
    branchName: 'Sanusi Fafunwa',
    createdAt: '2018-12-30',
    updatedAt: '2018-12-30'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Branch')
};
