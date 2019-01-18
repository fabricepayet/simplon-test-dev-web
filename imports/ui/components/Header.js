import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { history } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/" onClick={(e) => { e.preventDefault(); history.push('/'); }}>Simplon Test Web Dev</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/users" onClick={(e) => { e.preventDefault(); history.push('/users'); }}>Ajouter un utilisateur</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/assignements" onClick={(e) => { e.preventDefault(); history.push('/assignements'); }}>Attribuer un poste</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
