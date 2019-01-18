import React, { Fragment, Component } from 'react';
import {
  Button,
  Spinner,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Alert,
} from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment/min/moment-with-locales';
import Assignements from '../../api/Assignements/Assignements';
import Stations from '../../api/Stations/Stations';
import Users from '../../api/Users/Users';
import Timeslots from '../../api/Timeslots/Timeslots';

moment.locale('fr');


class AssignementsPage extends Component {
  constructor(props) {
    super(props);
    this.toggleModalAssignement = this.toggleModalAssignement.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handleAssignement = this.handleAssignement.bind(this);
    this.openModalAssignement = this.openModalAssignement.bind(this);
    this.state = {
      isModalAssignementOpen: false,
      userIdSelected: null,
      stationSelected: {},
      timeslotSelected: {},
    };
  }

  removeAssignement(assignementId) {
    Meteor.call('removeAssignement', {
      assignementId,
    }, (err) => {
      this.setState({
        userIdSelected: null,
      });
      if (err) {
        toast.error(err.message);
      }
    });
  }

  handleSelectUser(event) {
    this.setState({ userIdSelected: event.target.value });
  }

  handleAssignement() {
    const { userIdSelected, stationSelected, timeslotSelected } = this.state;

    Meteor.call('createAssignement', {
      userId: userIdSelected,
      stationId: stationSelected._id,
      timeslotId: timeslotSelected._id,
    }, (err) => {
      this.setState({
        isModalAssignementOpen: false,
        userIdSelected: {},
        stationSelected: {},
      });
      if (err) {
        toast.error(err.message);
      }
    });
  }

  openModalAssignement(timeslotSelected, stationSelected) {
    this.setState({
      isModalAssignementOpen: true,
      timeslotSelected,
      stationSelected,
    });
  }

  toggleModalAssignement() {
    const { isModalAssignementOpen } = this.state;
    this.setState({
      isModalAssignementOpen: !isModalAssignementOpen,
      userIdSelected: null,
    });
  }

  render() {
    const {
      isLoading,
      stations,
      timeslots,
    } = this.props;
    const {
      isModalAssignementOpen, stationSelected, userIdSelected, timeslotSelected,
    } = this.state;

    const renderAssignement = (timeslot, station) => {
      const assignement = Assignements.findOne({ timeslotId: timeslot._id, stationId: station._id });
      if (assignement) {
        return (
          <div className="text-center">
            <div>
              {assignement.user().firstName}
              {' '}
              {assignement.user().lastName}
            </div>
            <Button size="sm" outline color="danger" onClick={() => this.removeAssignement(assignement._id)}>Annuler</Button>
          </div>
        );
      }

      return (
        <div>
          <Button outline size="sm" onClick={() => this.openModalAssignement(timeslot, station)}>Attribuer ce créneau</Button>
        </div>
      );
    };

    const renderSelectUserForm = () => {
      const users = Users.find({}).fetch();
      const unassignedUsers = users.filter(user => !Assignements.findOne({ userId: user._id, timeslotId: timeslotSelected._id }));

      if (!unassignedUsers.length) {
        return (
          <Fragment>
            <ModalBody>
              <Alert color="danger">Tous les utilisateurs ont étés affectés à un poste pour ce créneau</Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModalAssignement}>Fermer</Button>
            </ModalFooter>
          </Fragment>
        );
      }
      return (
        <Form>
          <ModalBody>
            <FormGroup>
              <Input type="select" name="user" onChange={this.handleSelectUser} defaultValue="">
                <option value="" disabled="disabled">Choisir un utilisateur</option>
                {
                  unassignedUsers.map(user => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.firstName}
                      {' '}
                      {user.lastName}
                    </option>
                  ))
                }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalAssignement}>Fermer</Button>
            {' '}
            <Button color="primary" onClick={this.handleAssignement} disabled={!userIdSelected}>Attribuer le poste</Button>
          </ModalFooter>
        </Form>
      );
    };

    return (
      <Container className="pt-3">
        {
          isLoading
            ? <Spinner color="primary" />
            : (
              <Fragment>
                <h3>Attribuer un poste</h3>
                <Modal isOpen={isModalAssignementOpen} toggle={this.toggleModalAssignement}>
                  <ModalHeader toggle={this.toggleModalAssignement}>
                    Attribuer le
                    {' '}
                    {stationSelected.name}
                    {' '}
                    de
                    {' '}
                    {timeslotSelected.beginHour}
                    {' '}
                    à
                    {' '}
                    {timeslotSelected.endHour}
                    {}
                  </ModalHeader>
                  {renderSelectUserForm()}

                </Modal>

                {
                  <Table>
                    <thead>
                      <tr>
                        <th />
                        {
                          stations.map(station => <th key={station._id}>{station.name}</th>)
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        timeslots.map(timeslot => (
                          <tr key={timeslot._id}>
                            <th scope="row">
                              de
                              {' '}
                              {timeslot.beginHour}
                              {' '}
                              à
                              {' '}
                              {timeslot.endHour}
                            </th>
                            {
                              stations.map(station => <td key={station._id}>{renderAssignement(timeslot, station)}</td>)
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>

                }
              </Fragment>
            )
        }
      </Container>
    );
  }
}

export default withTracker(() => {
  const assignementsSubscription = Meteor.subscribe('assignements');
  const stationsSubscription = Meteor.subscribe('stations');
  const usersSubscription = Meteor.subscribe('users');
  const timeslotsSubscription = Meteor.subscribe('timeslots');

  return {
    isLoading: !assignementsSubscription.ready() || !stationsSubscription.ready() || !usersSubscription.ready() || !timeslotsSubscription.ready(),
    timeslots: Timeslots.find().fetch(),
    stations: Stations.find({}).fetch(),
  };
})(withRouter(AssignementsPage));
