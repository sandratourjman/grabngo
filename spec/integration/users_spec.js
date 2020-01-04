// tests for sign up and sign in
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Welcome to Grab n Go! Please sign up for an account.");
        done();
      });
    });

  });

  describe("POST /users", () => {

    it("should create a new user with valid values and redirect", (done) => {
      const options = {
        url: `${base}sign_up`,
        form: {
          email: "user@example.com",
          password: "123456",
          passwordConfirmation: "123456"
        }
      };

      request.post(options, 
        (err, res, body) => {
        User.findOne({ where: { email: "user@example.com" } })
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        })
      })
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      const options = {
        url: `${base}sign_up`,
        form: {
          email: 'Its me MARIOOO',
          password: '123456',
          passwordConfirmation: '345678'
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: 'Its me MARIOOO' } })
          .then((user) => {
            expect(user).toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Welcome back! Sign in to your account.");
        done();
      });
    });

  });

});