/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const countryOk = {
  name: "Republica de Banania",
  flagimg: "asd",
  region: "South America",
  capital: "jerepalski",
  id: "RDB",
};

const activityOk = {
  name: "pelotapaleta",
  difficulty: "1",
  duration: "2",
  season: "Verano",
};

describe("ROUTES:", () => {
  describe("Country get correctly", () => {
    before(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );
    beforeEach(() =>
      Country.sync({ force: true }).then(() => Country.create(countryOk))
    );
    describe("GET /countries", () => {
      it("should get 200", () => agent.get("/countries").expect(200));
    });
    describe("GET /countries/:idoname", () => {
      it("should get 200", () =>
        agent.get(`/countries/${countryOk.id}`).expect(200));
    });
  });

  describe("Activity get correctly", () => {
    before(() =>
      conn.authenticate().catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
    );
    beforeEach(() =>
      Activity.sync({ force: true }).then(() => Activity.create(activityOk))
    );
    describe("GET /activities", () => {
      it("should get 200", () => agent.get("/activities").expect(200));
    });
  });

});
