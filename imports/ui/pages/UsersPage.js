import React from 'react';
import {
  Button,
  Spinner,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment/min/moment-with-locales';

import Users from '../../api/Users/Users';

moment.locale('fr');

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      isCreatingUser: false,
    };
  }

  handleCreateUser(event) {
    event.preventDefault();
    const { firstName, lastName } = this.state;

    if (!firstName || !lastName) {
      toast.error('Veuillez compléter tous les champs');
      return;
    }

    this.setState({
      isCreatingUser: true,
    });


    Meteor.call('createUser', { firstName, lastName }, (err) => {
      this.setState({
        isCreatingUser: false,
        firstName: '',
        lastName: '',
      });
      if (err) {
        toast.error(err.message);
      }
    });
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  render() {
    const { users, isLoading } = this.props;
    const { isCreatingUser, firstName, lastName } = this.state;
    return (
      <Container className="pt-3">
        <Row className="mb-4">
          <Col>

            <h3>Ajouter un utilisateur</h3>
            <div>

              <Form inline>
                <FormGroup className="mr-1">
                  <Label for="firstName" hidden>Prénom</Label>
                  <Input type="text" name="firstName" value={firstName} id="exampleEmail" placeholder="Prénom" onChange={this.handleChangeFirstName} />
                </FormGroup>
                {' '}
                <FormGroup className="mr-1">
                  <Label for="lastName" hidden>Nom</Label>
                  <Input type="text" name="lastName" value={lastName} placeholder="Nom" onChange={this.handleChangeLastName} />
                </FormGroup>
                {' '}

                <Button color="primary" onClick={this.handleCreateUser} disabled={isCreatingUser}>Ajouter un utilisateur</Button>
              </Form>
            </div>
          </Col>

        </Row>

        <Row>
          <Col>
            <h3>Liste des utilisateurs</h3>
            <div>
              {
                isLoading
                  ? <Spinner color="primary" />
                  : (
                    <Table>
                      <thead>
                        <tr>
                          <th>Ajouté le</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user._id}>
                            <th scope="row">{moment(user.createdAt).format('DD MMMM YYYY à HH:mm')}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default withTracker(() => {
  const usersSubscription = Meteor.subscribe('users');
  return {
    isLoading: !usersSubscription.ready(),
    users: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(withRouter(UsersPage));
