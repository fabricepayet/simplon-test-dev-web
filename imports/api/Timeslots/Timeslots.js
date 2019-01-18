/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Timeslots = new Mongo.Collection('Timeslots');

Timeslots.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Timeslots.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Timeslots.schema = new SimpleSchema({
  beginHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  updatedAt: {
    type: String,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    },
  },
});

Timeslots.attachSchema(Timeslots.schema);

export default Timeslots;
