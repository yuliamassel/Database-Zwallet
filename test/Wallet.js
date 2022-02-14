const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
// const fs = require('fs');
require('dotenv').config();
chai.use(chaiHttp);

const api = chai.request(process.env.BASE_URL);

// eslint-disable-next-line no-undef
describe('Endpoint for Wallet', () => {
  // eslint-disable-next-line no-undef
  describe('Make a Wallet', function () {
    // eslint-disable-next-line no-undef
    it('Expect must have status code', function () {
      api.post('/wallet')
        .set('Content-Type', 'appliction/json')
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Si Encek',
          user_id: 5,
          ballance: 150000
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('message').equals('Succes make wallet');
        })
        .catch(function (err) {
          throw err;
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect must have status code', function (done) {
      api.get('/wallet')
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
  });
});
