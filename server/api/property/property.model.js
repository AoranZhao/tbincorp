'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './property.events';

var PropertySchema = new mongoose.Schema({
  name_en: {
  	type: String
  },
  name_zh: {
  	type: String,
  	required: true
  },
  description_en: {
  	type: String
  },
  description_zh: {
  	type: String
  },
  property_type: {
  	type: String,
  	required: true
  },
  images: [{
    image: {
      filedname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number
    }, 
    description_en: String, 
    description_zh: String
  }],
  vr_link: {
    type: String
  },
  created_date: {
  	type: Date,
  	required: true,
  	default: Date.now
  }
});

// add custom static method
PropertySchema.statics.findByCat = function(cat, cb) {
  return this.model('Property').find({property_type: cat}, cb);
}

PropertySchema.statics.insertImages = function(identify, images, cb) {
  return this.model('Property').update(identify, {$push: {images: {$each: images}}}, cb);
}

PropertySchema.statics.removeImage = function(identify, mid, cb) {
  return this.model('Property').update(identify, {$pull: {images: {_id: mid}}}, cb);
}

PropertySchema.statics.updateImage = function(identify, modify, cb) {
  return this.model('Property').update(identify, modify, cb);
}

registerEvents(PropertySchema);
export default mongoose.model('Property', PropertySchema);
