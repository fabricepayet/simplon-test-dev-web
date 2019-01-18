import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import Users from './Users';

export const createUser = new ValidatedMethod({
  name: 'createUser',
  validate: new SimpleSchema({
    firstName: { type: String, optional: false },
    lastName: { type: String, optional: false },
  }).validator(),
  run({ firstName, lastName }) {
    if (this.isSimulation) return false;

    Users.insert({
      firstName,
      lastName,
    });

    return true;
  },
});

export default {};
