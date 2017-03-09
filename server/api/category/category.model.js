'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './category.events';

// var CategorySchema = new mongoose.Schema({
//   name: String,
//   info: String,
//   active: Boolean
// });

var CategorySchema = new mongoose.Schema({
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
  created_date: {
  	type: Date,
  	required: true,
  	default: Date.now
  } 
});

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);
