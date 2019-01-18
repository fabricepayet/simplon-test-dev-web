import { Meteor } from 'meteor/meteor';
import Users from '../Users';

function publishUsers() {
  return Users.find({});
}

Meteor.publish('users', publishUsers);
