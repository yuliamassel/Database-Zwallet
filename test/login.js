const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config();
chai.use(chaiHttp);

const api = chai.request(process.env.BASE_URL);
// eslint-disable-next-line no-undef
describe('Login Account', function () {
  // eslint-disable-next-line no-undef
  it('Succes Login & have status code', function (done) {
    api.post('/users/login')
      .set('Content-Type', 'Application/json')
      .send({
        email: 'david@gmail.com',
        password: 'david123'
      })
      // eslint-disable-next-line node/handle-callback-err
      .end((error, res) => {
        expect(res.status).to.equals(200);
        global.token = res.body.data.token;
        global.id = res.body.data.id;
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('Expect must have data & object', function (done) {
    api.post('/users/login')
      .set('Content-Type', 'Application/json')
      .send({
        email: 'david@gmail.com',
        password: 'david123'
      })
    // eslint-disable-next-line node/handle-callback-err
      .end((error, res) => {
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  // eslint-disable-next-line no-undef
  it('Expect output must have some data', function (done) {
    api.post('/users/login')
      .set('Content-Type', 'Application/json')
      .send({
        email: 'david@gmail.com',
        password: 'david123'
      })
    // eslint-disable-next-line node/handle-callback-err
      .end((error, res) => {
        expect(res.body.data).to.have.property('username').to.equals('David Chiang');
        done();
      });
  });
});
