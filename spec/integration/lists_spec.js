const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const List = require("../../src/db/models").List;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : lists", () => {

  describe("GET /lists", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});