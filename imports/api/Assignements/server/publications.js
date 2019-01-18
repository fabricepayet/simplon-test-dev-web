import { publishComposite } from 'meteor/reywood:publish-composite';

import Assignements from '../Assignements';
import Users from '../../Users/Users';
import Stations from '../../Stations/Stations';
import Timeslots from '../../Timeslots/Timeslots';

publishComposite('assignements', {
  find() {
    return Assignements.find({});
  },
  children: [
    {
      find(assignement) {
        return Stations.find({ _id: assignement.stationId });
      },
    },
    {
      find(assignement) {
        return Users.find({ _id: assignement.userId });
      },
    },
    {
      find(assignement) {
        return Timeslots.find({ _id: assignement.timeslotId });
      },
    },
  ],
});
