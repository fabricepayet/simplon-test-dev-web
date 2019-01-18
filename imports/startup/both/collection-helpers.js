import Assignements from '../../api/Assignements/Assignements';
import Users from '../../api/Users/Users';
import Stations from '../../api/Stations/Stations';
import Timeslots from '../../api/Timeslots/Timeslots';

Assignements.helpers({
  user() {
    return Users.findOne(this.userId);
  },

  station() {
    return Stations.findOne(this.stationId);
  },

  timeslot() {
    return Timeslots.findOne(this.timeslotId);
  },
});
