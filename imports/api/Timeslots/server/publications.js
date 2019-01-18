import { Meteor } from 'meteor/meteor';
import Timeslots from '../Timeslots';

function publishTimeslots() {
  return Timeslots.find({});
}

Meteor.publish('timeslots', publishTimeslots);
