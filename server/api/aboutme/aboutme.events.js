/**
 * Aboutme model events
 */

'use strict';

import {EventEmitter} from 'events';
var AboutmeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AboutmeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Aboutme) {
  for(var e in events) {
    let event = events[e];
    Aboutme.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    AboutmeEvents.emit(event + ':' + doc._id, doc);
    AboutmeEvents.emit(event, doc);
  };
}

export {registerEvents};
export default AboutmeEvents;
