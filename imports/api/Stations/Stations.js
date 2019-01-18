import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Stations = new Mongo.Collection('Stations');

Stations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Stations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Stations.schema = new SimpleSchema({
  name: {
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

Stations.attachSchema(Stations.schema);

export default Stations;
