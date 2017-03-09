'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './aboutme.events';

var AboutmeSchema = new mongoose.Schema({
  description_en: {
  	type: String
  },
  description_zh: {
  	type: String
  },
  facebook: {
  	type: String
  },
  twitter: {
  	type: String
  },
  linkedin: {
  	type: String
  },
  email: {
  	type: String
  },
  created_date: {
  	type: Date,
  	default: Date.now()
  }
});

registerEvents(AboutmeSchema);
export default mongoose.model('Aboutme', AboutmeSchema);
