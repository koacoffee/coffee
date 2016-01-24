const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/coffee_app_test';
const server = require(__dirname + '/../server');
const Bear = require(__dirname + '/../models/coffee');

describe('coffee api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all coffees', (done) => {
    chai.request('localhost:3000')
      .get('/api/coffee')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create coffee info with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/coffee')
      .send({name: 'test coffee'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test coffee');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests for coffee info already in db', () => {
    beforeEach((done) => {
      Coffee.create({name: 'test coffee'}, (err, data) => {
        this.testCoffee = data;
        done();
      });
    });

    it('should be able to update coffee info', (done) => {
      chai.request('localhost:3000')
        .put('/api/coffee/' + this.testCoffee._id)
        .send({name: 'new coffee name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete coffee info', (done) => {
      chai.request('localhost:3000')
        .delete('/api/coffee/' + this.testCoffee._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
