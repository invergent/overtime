module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    claimId: 12,
    activity: 'Your claim was approved by your supervisor',
    type: 'Approved',
    userId: 10,
    read: false,
    viewed: false,
    createdAt: new Date('2019-05-18'),
    updatedAt: new Date()
  },
  {
    claimId: 14,
    activity: 'Your claim was declined by your BSM',
    type: 'Declined',
    userId: 10,
    read: false,
    viewed: false,
    createdAt: new Date('2019-05-18'),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Notifications')
};
