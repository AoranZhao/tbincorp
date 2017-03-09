'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newProperty;

describe('Property API:', function() {
  describe('GET /api/properties', function() {
    var propertys;

    beforeEach(function(done) {
      request(app)
        .get('/api/properties')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          propertys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(propertys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/properties', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/properties')
        .send({
          name: 'New Property',
          info: 'This is the brand new property!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newProperty = res.body;
          done();
        });
    });

    it('should respond with the newly created property', function() {
      expect(newProperty.name).to.equal('New Property');
      expect(newProperty.info).to.equal('This is the brand new property!!!');
    });
  });

  describe('GET /api/properties/:id', function() {
    var property;

    beforeEach(function(done) {
      request(app)
        .get(`/api/properties/${newProperty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          property = res.body;
          done();
        });
    });

    afterEach(function() {
      property = {};
    });

    it('should respond with the requested property', function() {
      expect(property.name).to.equal('New Property');
      expect(property.info).to.equal('This is the brand new property!!!');
    });
  });

  describe('PUT /api/properties/:id', function() {
    var updatedProperty;

    beforeEach(function(done) {
      request(app)
        .put(`/api/properties/${newProperty._id}`)
        .send({
          name: 'Updated Property',
          info: 'This is the updated property!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProperty = {};
    });

    it('should respond with the updated property', function() {
      expect(updatedProperty.name).to.equal('Updated Property');
      expect(updatedProperty.info).to.equal('This is the updated property!!!');
    });

    it('should respond with the updated property on a subsequent GET', function(done) {
      request(app)
        .get(`/api/properties/${newProperty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let property = res.body;

          expect(property.name).to.equal('Updated Property');
          expect(property.info).to.equal('This is the updated property!!!');

          done();
        });
    });
  });

  describe('PATCH /api/properties/:id', function() {
    var patchedProperty;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/properties/${newProperty._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Property' },
          { op: 'replace', path: '/info', value: 'This is the patched property!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedProperty = {};
    });

    it('should respond with the patched property', function() {
      expect(patchedProperty.name).to.equal('Patched Property');
      expect(patchedProperty.info).to.equal('This is the patched property!!!');
    });
  });

  describe('DELETE /api/properties/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/properties/${newProperty._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when property does not exist', function(done) {
      request(app)
        .delete(`/api/properties/${newProperty._id}`)
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
