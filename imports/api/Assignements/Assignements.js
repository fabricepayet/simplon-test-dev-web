/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Assignements = new Mongo.Collection('Assignements');

Assignements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Assignements.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Assignements.schema = new SimpleSchema({
  userId: {
    type: String,
    required: true,
  },
  stationId: {
    type: String,
    required: true,
  },
  timeslotId: {
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

Assignements.attachSchema(Assignements.schema);

export default Assignements;
