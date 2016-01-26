const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/coffee_app_test';
const server = require(__dirname + '/../index');
const coffeeModel = require(__dirname + '/../models/coffee_model');

var serverUrl = 'http://localhost:3000';

describe('Coffee API', () => {
  it('should make a valid GET request of coffees', (done) => {
    request(serverUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should make a valid POST request of coffees', (done) => {
    request(serverUrl)
      .post('/')
      .send({name: 'test coffee'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test coffee');
        // expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('requests that require a coffee already in db', () => {
    beforeEach(done => {
      coffeeModel.create({name: 'test coffee'}, (err, data) => {
        if (err) return console.log(err);
        this.testCoffee = data;
        done();
      });
    });

    it('should be able to update coffee info', (done) => {
      request(serverUrl)
        .put('/' + this.testCoffee._id)
        .send(this.testCoffee)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete coffee info', (done) => {
      console.log('testCoffee is : ');
      console.dir(this.testCoffee);
      request(serverUrl)
        .delete('/' + this.testCoffee._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
