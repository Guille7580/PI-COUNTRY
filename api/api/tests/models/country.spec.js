const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

const countryOk = {
  name: "Republica de Banania",
  flagimg: "asd",
  region: "South America",
  capital: "jerepalski" ,
  id: "RDB"
};

const countryNotOk = {
  flagimg: "asd",
  capital: "jerepalski" ,
  id: "RDB"
};

const activityOk = {
  name: "pelotapaleta",
  difficulty: "1", 
  duration: "2", 
  season: "Spring"
}

const activityNotOk = {
  difficulty: "1", 
  duration: "2", 
}

describe('MODELS:', () => {
describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name, image, continent, capital or id', () => {
      it('should throw an error if name, image, continent, capital or id are null', (done) => {
        Country.create(countryNotOk)
          .then(() => done(new Error('It requires name, image, continent, capital or id (not null)')))
          .catch(() => done());
      });
      it('should work when its a valid name, image, continent, capital and id', () => {
        Country.create(countryOk);
      });
    });
  });
});

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Activity.create(activityNotOk)
          .then(() => done(new Error('It requires a valid name (not null)')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Activity.create(activityOk);
      });
    });
  });
});

})