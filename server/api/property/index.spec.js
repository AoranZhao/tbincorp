'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var propertyCtrlStub = {
  index: 'propertyCtrl.index',
  show: 'propertyCtrl.show',
  create: 'propertyCtrl.create',
  upsert: 'propertyCtrl.upsert',
  patch: 'propertyCtrl.patch',
  destroy: 'propertyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var propertyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './property.controller': propertyCtrlStub
});

describe('Property API Router:', function() {
  it('should return an express router instance', function() {
    expect(propertyIndex).to.equal(routerStub);
  });

  describe('GET /api/properties', function() {
    it('should route to property.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'propertyCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/properties/:id', function() {
    it('should route to property.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'propertyCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/properties', function() {
    it('should route to property.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'propertyCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/properties/:id', function() {
    it('should route to property.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'propertyCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/properties/:id', function() {
    it('should route to property.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'propertyCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/properties/:id', function() {
    it('should route to property.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'propertyCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
