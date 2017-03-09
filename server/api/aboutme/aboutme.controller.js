/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/aboutmes              ->  index
 * POST    /api/aboutmes              ->  create
 * GET     /api/aboutmes/:id          ->  show
 * PUT     /api/aboutmes/:id          ->  upsert
 * PATCH   /api/aboutmes/:id          ->  patch
 * DELETE  /api/aboutmes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Aboutme from './aboutme.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Aboutmes
export function index(req, res) {
  return Aboutme.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Aboutme from the DB
export function show(req, res) {
  return Aboutme.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Aboutme in the DB
export function create(req, res) {
  return Aboutme.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Aboutme in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Aboutme.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Aboutme in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Aboutme.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Aboutme from the DB
export function destroy(req, res) {
  return Aboutme.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
