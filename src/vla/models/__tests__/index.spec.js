import db from '../index';

describe('Copied Db tests', () => {
  it('should return the DBs copied', () => {
    expect(Object.keys(db).includes('Branch')).toEqual(true);
    expect(Object.keys(db).includes('Staff')).toEqual(true);
    expect(Object.keys(db).includes('Supervisor')).toEqual(true);
  });
});
