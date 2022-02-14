const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
// const fs = require('fs');
require('dotenv').config();
chai.use(chaiHttp);

const api = chai.request(process.env.BASE_URL);

// eslint-disable-next-line no-undef
describe('Endpoint for Transaction', () => {
  // eslint-disable-next-line no-undef
  describe('Procces Transaction', function () {
    // eslint-disable-next-line no-undef
    it('Expect must have a status code', function () {
      api.post('/transaction')
        .set('Content-Type', 'appliction/json')
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          source_id: 5,
          destination_id: 1,
          amount: 2000,
          balance_left: 2000,
          notes: 'bla lagi dan lagi'
        })
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  // eslint-disable-next-line no-undef
  describe('Get All Transaction', function () {
    // eslint-disable-next-line no-undef
    it('Succes get all transaction & expect to have status code', function (done) {
      api.get('/transaction')
        .set('Content-Type', 'Appliction/json')
        .set({ Authorization: `Bearer ${global.token}` })
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.status).to.equals(200);
          done();
        });
    });
    // eslint-disable-next-line no-undef
    it('Expect ouput should have some data', function (done) {
      api.get('/transaction')
        .set('Content-Type', 'Appliction/json')
        .set({ Authorization: `Bearer ${global.token}` })
      // eslint-disable-next-line node/handle-callback-err
        .end((error, res) => {
          expect(res.body.data[0]).to.have.property('notes').to.equals('For buying a shoes');
          expect(res.body.data[0]).to.have.property('id');
          done();
        });
    });
  });
});
