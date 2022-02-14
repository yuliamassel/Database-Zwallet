const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
// const fs = require('fs');
require('dotenv').config();
chai.use(chaiHttp);

const api = chai.request(process.env.BASE_URL);

// eslint-disable-next-line no-undef
describe('Endpoint for user', () => {
  // eslint-disable-next-line no-undef
  describe('Get All User', function () {
  // eslint-disable-next-line no-undef
    it('Succes get all user & have status code', function (done) {
      api.get('/users')
        .set('Content-Type', 'appliction/json')
        .set({ Authorization: `Bearer ${global.token}` })
        // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          // expect(res.body).to.have.property('data').to.be.an('array');
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property('data');
          // global.id = res.body.data.id;
          // console.log(global.id);
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect have data & type array', function (done) {
      api.get('/users')
        .set('Content-Type', 'appliction/json')
        .set({ Authorization: `Bearer ${global.token}` })
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property('data').to.be.an('array');
          // expect(res.body).to.have.property('data');
          // global.id = res.body.data.id;
          // console.log(global.id);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  describe('Get Detail User by id', function () {
    // eslint-disable-next-line no-undef
    it('Expect have status code', function (done) {
      api.get(`/users/${global.id}`)
        .set('Content-Type', 'appliction/json')
        .set('Authorization', `Bearer ${global.token}`)
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          // expect(res.body).to.have.property('data').to.be.an('array');
          expect(res.status).to.equals(200);
          // eslint-disable-next-line no-unused-expressions
          expect(error).to.be.null;
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect Object have a data', function (done) {
      api.get(`/users/${global.id}`)
        .set('Content-Type', 'appliction/json')
        .set('Authorization', `Bearer ${global.token}`)
        // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.body).to.have.property('data').to.be.an('object');
          // expect(res.body).to.have.property('data');
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect data have some kind of type data', function (done) {
      api.get(`/users/${global.id}`)
        .set('Content-Type', 'appliction/json')
        .set('Authorization', `Bearer ${global.token}`)
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          // console.log(res);
          expect(res.body.data).to.have.property('email').to.be.an('string');
          // expect(res.body.data).to.have.lengthOf(15);
          expect(res.body.data).to.have.property('ballance').to.be.an('number');
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  describe('Get User by Query Params', function () {
    // eslint-disable-next-line no-undef
    it('Succes get user by query params & have status code', function (done) {
      api.get('/users')
        .query({ username: 'simbok', limit: 2 })
        .set({ Authorization: `Bearer ${global.token}` })
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.status).to.equals(200);
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect have some data from result', function (done) {
      api.get('/users')
        .query({ username: 'simbok', limit: 2 })
        .set({ Authorization: `Bearer ${global.token}` })
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.status).to.equals(200);
          expect(res.body.data[0]).to.have.property('username').to.equals('Simbok');
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect have query params', function (done) {
      // eslint-disable-next-line quotes
      api.get(`/users?`)
        .query({ username: 'simbok', limit: 2 })
        .set({ Authorization: `Bearer ${global.token}` })
        .set('Content-Type', 'appliction/json')
        .end((req) => {
          expect(req).to.have.param('username');
          done();
        });
      // .then(function (req) {
      //   // expect(res.body.data).to.have.property('message').equals('Succes make wallet');
      //   expect(req).to.have.param('username');
      // })
      // .catch(function (err) {
      //   throw err;
      // });
    });
  });

  // // eslint-disable-next-line no-undef
  // describe('Update User', function () {
  //   // eslint-disable-next-line no-undef
  //   it('Succes update', function (done) {
  //     // eslint-disable-next-line prefer-const
  //     let dataUser = ({
  //       username: 'Andi Soleman',
  //       email: 'encek@gmail.com',
  //       password: 'encek1234',
  //       addres: 'Jl Kemakmuran Kebumen',
  //       telephone: 62745687101
  //     });
  //     // eslint-disable-next-line node/handle-callback-err
  //     api.put(`/users/${global.id}`)
  //       .set('Content-Type', 'Application/json')
  //       .set('Authorization', `Bearer ${global.token}`)
  //       .send(dataUser)
  //       // eslint-disable-next-line node/handle-callback-err
  //       .end((error, res) => {
  //         // expect(res.body).to.have.property('data').to.be.an('array');
  //         // expect(res.status).to.equals(200);
  //         expect(res.body).to.have.property('message').equals('update profile succes');
  //         // expect(res.body).to.have.property('update profile succes');
  //         // expect(res.body.data).to.have.property('email').to.be.an('string');
  //         done();
  //       });
  //   });
  // });

  // // eslint-disable-next-line no-undef
  // describe('Delete User', function () {
  //   // eslint-disable-next-line no-undef
  //   it('Delete user', function (done) {
  //     api.delete(`/users/${global.id}`)
  //       .set('Content-Type', 'appliction/json')
  //       .set('Authorization', `Bearer ${global.token}`)
  //       // eslint-disable-next-line node/handle-callback-err
  //       .end((error, res) => {
  //         if (role !== 'admin') return next(createError(403, 'Access Denied!'));
  //         // expect(res.body).to.have.property('data').to.be.an('array');
  //         expect(res.status).to.equals(200);
  //         // expect(res.body).to.have.property('data');
  //         expect(res.body.data).to.have.property('message').equals('succes delete user');
  //         done();
  //       });
  //   });
  // });
});

// eslint-disable-next-line prefer-const
let data = {
  username: 'Diki',
  email: 'diki@gmail.com',
  password: 'diki123',
  addres: 'Jl Karanganyar Kebumen',
  telephone: 621283091283
};

// eslint-disable-next-line no-undef
describe('Create User with method POST', () => {
  // eslint-disable-next-line no-undef
  it('Expect must have status code', function (done) {
    api.post('/users')
      .set('Content-Type', 'Application/json')
      .send(data)
    // eslint-disable-next-line node/handle-callback-err
      .end((error, res) => {
        expect(res.status).to.equals(200);
        // expect(res.body).to.have.property('data');
        // console.log(res.body);
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('Expect must have some data on result', function (done) {
    api.post('/users')
      .set('Content-Type', 'Application/json')
      .send(data)
      // eslint-disable-next-line node/handle-callback-err
      .end((error, res) => {
        expect(res.status).to.equals(200);
        expect(res.body).to.have.property('message').to.equals('great you come in');
        // expect(res.body).to.have.property('data');
        // console.log(res.body);
        done();
      });
  });
});
