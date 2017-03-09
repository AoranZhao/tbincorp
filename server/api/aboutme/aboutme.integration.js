'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAboutme;

describe('Aboutme API:', function() {
  describe('GET /api/aboutmes', function() {
    var aboutmes;

    beforeEach(function(done) {
      request(app)
        .get('/api/aboutmes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          aboutmes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(aboutmes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/aboutmes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/aboutmes')
        .send({
          name: 'New Aboutme',
          info: 'This is the brand new aboutme!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAboutme = res.body;
          done();
        });
    });

    it('should respond with the newly created aboutme', function() {
      expect(newAboutme.name).to.equal('New Aboutme');
      expect(newAboutme.info).to.equal('This is the brand new aboutme!!!');
    });
  });

  describe('GET /api/aboutmes/:id', function() {
    var aboutme;

    beforeEach(function(done) {
      request(app)
        .get(`/api/aboutmes/${newAboutme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          aboutme = res.body;
          done();
        });
    });

    afterEach(function() {
      aboutme = {};
    });

    it('should respond with the requested aboutme', function() {
      expect(aboutme.name).to.equal('New Aboutme');
      expect(aboutme.info).to.equal('This is the brand new aboutme!!!');
    });
  });

  describe('PUT /api/aboutmes/:id', function() {
    var updatedAboutme;

    beforeEach(function(done) {
      request(app)
        .put(`/api/aboutmes/${newAboutme._id}`)
        .send({
          name: 'Updated Aboutme',
          info: 'This is the updated aboutme!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAboutme = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAboutme = {};
    });

    it('should respond with the updated aboutme', function() {
      expect(updatedAboutme.name).to.equal('Updated Aboutme');
      expect(updatedAboutme.info).to.equal('This is the updated aboutme!!!');
    });

    it('should respond with the updated aboutme on a subsequent GET', function(done) {
      request(app)
        .get(`/api/aboutmes/${newAboutme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let aboutme = res.body;

          expect(aboutme.name).to.equal('Updated Aboutme');
          expect(aboutme.info).to.equal('This is the updated aboutme!!!');

          done();
        });
    });
  });

  describe('PATCH /api/aboutmes/:id', function() {
    var patchedAboutme;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/aboutmes/${newAboutme._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Aboutme' },
          { op: 'replace', path: '/info', value: 'This is the patched aboutme!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAboutme = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAboutme = {};
    });

    it('should respond with the patched aboutme', function() {
      expect(patchedAboutme.name).to.equal('Patched Aboutme');
      expect(patchedAboutme.info).to.equal('This is the patched aboutme!!!');
    });
  });

  describe('DELETE /api/aboutmes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/aboutmes/${newAboutme._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when aboutme does not exist', function(done) {
      request(app)
        .delete(`/api/aboutmes/${newAboutme._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
