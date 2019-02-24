module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Claims', [{
    monthOfClaim: 'Oct, 2018',
    weekday: null,
    weekend: null,
    shift: 9,
    requester: 1,
    approvedBySupervisor: true,
    approvedByBSM: false,
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Nov, 2018',
    weekday: 12,
    weekend: 7,
    shift: null,
    requester: 3,
    approvedBySupervisor: false,
    approvedByBSM: false,
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Dec, 2018',
    weekday: 17,
    weekend: 6,
    shift: null,
    requester: 3,
    approvedBySupervisor: true,
    approvedByBSM: false,
    createdAt: '2019-02-06',
    updatedAt: '2019-02-06'
  },
  {
    monthOfClaim: 'Dec, 2018',
    weekday: 19,
    weekend: 5,
    shift: null,
    requester: 4,
    approvedBySupervisor: false,
    approvedByBSM: false,
    createdAt: '2019-02-24',
    updatedAt: '2019-02-24'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Claims')
};
