import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button
} from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        let loginButton;
        if (!this.props.auth.isAuthenticated) {
            loginButton = <NavLink href="/login">Login</NavLink>
        } else {
            loginButton = <Button color="dark" block onClick={this.onLogoutClick}>Logout
        </Button>
        }
        let registerSection;
        if (!this.props.auth.isAuthenticated) {
            registerSection = <NavLink href="/register">Register</NavLink>
        } else {
            registerSection = <NavLink href="/dashboard">{this.props.auth.user.name}</NavLink>
        }

        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">
                        Reddit Clone
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/TomKrsck">Github Source</NavLink>
                            </NavItem>
                            <NavItem>
                                {registerSection}
                            </NavItem>
                            <NavItem>
                                {loginButton}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

AppNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps, { logoutUser })(AppNavbar);