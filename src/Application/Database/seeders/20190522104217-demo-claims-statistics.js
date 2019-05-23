module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ClaimsStatistics', [{
    tenantRef: 'INIT',
    year: '2019',
    Jan: '200',
    Feb: '350',
    Mar: '300',
    Apr: '280',
    May: '400',
    Jun: '250',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Notifications')
};
