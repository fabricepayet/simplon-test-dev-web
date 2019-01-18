import { Meteor } from 'meteor/meteor';

import Stations from '../Stations';

function stationPublication() {
  return Stations.find({});
}

Meteor.publish('stations', stationPublication);
