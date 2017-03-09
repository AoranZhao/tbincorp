'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var aboutmeCtrlStub = {
  index: 'aboutmeCtrl.index',
  show: 'aboutmeCtrl.show',
  create: 'aboutmeCtrl.create',
  upsert: 'aboutmeCtrl.upsert',
  patch: 'aboutmeCtrl.patch',
  destroy: 'aboutmeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var aboutmeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './aboutme.controller': aboutmeCtrlStub
});

describe('Aboutme API Router:', function() {
  it('should return an express router instance', function() {
    expect(aboutmeIndex).to.equal(routerStub);
  });

  describe('GET /api/aboutmes', function() {
    it('should route to aboutme.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'aboutmeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/aboutmes/:id', function() {
    it('should route to aboutme.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'aboutmeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/aboutmes', function() {
    it('should route to aboutme.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'aboutmeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/aboutmes/:id', function() {
    it('should route to aboutme.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'aboutmeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/aboutmes/:id', function() {
    it('should route to aboutme.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'aboutmeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/aboutmes/:id', function() {
    it('should route to aboutme.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'aboutmeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
