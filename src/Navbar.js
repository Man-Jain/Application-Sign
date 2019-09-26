import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";
import {
  HashRouter,
  NavLink
} from "react-router-dom";

import './index.css'

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <div>
      <HashRouter>
      <Navbar type="dark" theme="primary" expand="md" className="navbar-class">
        <NavbarBrand href="#">Track Matic</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink active to="/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/new-artifact" className="nav-link">
              New Artifact
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/block" className="nav-link">
              New Artifact
              </NavLink>
            </NavItem>
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>

          <Nav navbar className="ml-auto">
            <span className="wallet-address">Wallet Address :- IE4C3BNWT4EYKPUZXGWDOOKBTJFVOYAZKBCWFYRC37U7BJKBIUH6NEB7SQ</span>
          </Nav>
        </Collapse>
      </Navbar>
      </HashRouter>
      </div>
    );
  }
}
