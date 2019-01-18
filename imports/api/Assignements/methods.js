import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import Assignements from './Assignements';
import Stations from '../Stations/Stations';
import Timeslots from '../Timeslots/Timeslots';
import Users from '../Users/Users';

export const createAssignement = new ValidatedMethod({
  name: 'createAssignement',
  validate: new SimpleSchema({
    stationId: { type: String, optional: false },
    userId: { type: String, optional: false },
    timeslotId: { type: String, optional: false },
  }).validator(),
  run({ stationId, userId, timeslotId }) {
    if (this.isSimulation) return false;

    const user = Users.findOne(userId);

    if (!user) {
      throw new Meteor.Error('User not found');
    }

    const station = Stations.findOne(stationId);

    if (!station) {
      throw new Meteor.Error('Station not found');
    }

    const timeslot = Timeslots.findOne(timeslotId);

    if (!timeslot) {
      throw new Meteor.Error('Timeslot not found');
    }

    const alreadyAssign = Assignements.findOne({
      userId,
      timeslotId,
    });

    if (alreadyAssign) {
      throw new Meteor.Error('User already assigned for the timeslot');
    }

    Assignements.insert({
      userId,
      stationId,
      timeslotId,
    });

    return true;
  },
});

export const removeAssignement = new ValidatedMethod({
  name: 'removeAssignement',
  validate: new SimpleSchema({
    assignementId: { type: String, optional: false },
  }).validator(),
  run({ assignementId }) {
    if (this.isSimulation) return false;

    const assignement = Assignements.findOne(assignementId);

    if (!assignement) {
      throw new Meteor.Error('Assignement not found');
    }

    Assignements.remove(assignementId);

    return true;
  },
});

export default {};
