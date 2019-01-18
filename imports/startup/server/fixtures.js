import seeder from '@cleverbeagle/seeder';

import Stations from '../../api/Stations/Stations';
import Users from '../../api/Users/Users';
import Timeslots from '../../api/Timeslots/Timeslots';
import Assignements from '../../api/Assignements/Assignements';

const stations = [];
for (let i = 0; i < 8; i++) {
  stations.push({
    name: `Poste n°${i + 1}`,
  });
}

seeder(Stations, {
  seedIfExistingData: false,
  resetCollection: false,
  environments: ['development', 'staging'],
  data: {
    static: stations,
  },
});
seeder(Assignements, {
  seedIfExistingData: false,
  resetCollection: false,
  environments: ['development', 'staging'],
  data: {
    static: [],
  },
});

seeder(Timeslots, {
  seedIfExistingData: false,
  resetCollection: false,
  environments: ['development', 'staging'],
  data: {
    static: [
      {
        beginHour: '7h00',
        endHour: '8h00',
      },
      {
        beginHour: '8h00',
        endHour: '9h00',
      },
      {
        beginHour: '9h00',
        endHour: '10h00',
      },
      {
        beginHour: '10h00',
        endHour: '11h00',
      },
      {
        beginHour: '11h00',
        endHour: '12h00',
      },
      {
        beginHour: '14h00',
        endHour: '15h00',
      },
      {
        beginHour: '15h00',
        endHour: '16h00',
      },
      {
        beginHour: '16h00',
        endHour: '17h00',
      },
    ],
  },
});

seeder(Users, {
  seedIfExistingData: false,
  resetCollection: false,
  environments: ['development', 'staging'],
  data: {
    static: [
      {
        firstName: 'Fabrice',
        lastName: 'Payet',
      },
      {
        firstName: 'Armand',
        lastName: 'Deniset',
      },
      {
        firstName: 'Alexandre',
        lastName: 'Clair',
      },
      {
        firstName: 'Farid',
        lastName: 'Humblot',
      },
    ],
  },
});
