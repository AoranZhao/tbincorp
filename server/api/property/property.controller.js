/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/properties              ->  index
 * POST    /api/properties              ->  create
 * GET     /api/properties/:id          ->  show
 * PUT     /api/properties/:id          ->  upsert
 * PATCH   /api/properties/:id          ->  patch
 * DELETE  /api/properties/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Property from './property.model';
import fs from 'fs';
import path from 'path';

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

// Gets a list of Propertys
export function index(req, res) {
  return Property.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Property from the DB
export function show(req, res) {
  return Property.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Property in the DB
export function create(req, res) {
  return Property.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Property in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Property.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Property in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Property.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Property from the DB
export function destroy(req, res) {
  return Property.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// find out properties in same category
export function findByCat(req, res) {
  return Property.findByCat(req.params.cat).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function uploadImage(req, res) {
  var images = [];
  for (var i = 0; i < req.files.length; i++) {
    images.push({image: req.files[i], description_en: '', description_zh: ''});
  }
  console.log(images);
  return Property.insertImages({_id: req.params.id}, images).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function deleteFile(res, filename) {
  fs.unlink(path.join(path.dirname(path.dirname(path.dirname(__dirname))), "client/assets/images/photos/", filename), (err) => {
    console.log(err);
  });
}

export function deleteImage(req, res) {
  return Property.removeImage({_id: req.params.id}, req.params.mid).exec()
    .then(deleteFile(res, req.body.image.filename))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function editImage(req, res) {
  console.log("body\n" + req.body);
  return Property.updateImage({_id: req.params.id, "images._id": req.params.mid}, {$set: {"images.$.description_zh": req.body.description_zh, "images.$.description_en": req.body.description_en}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}