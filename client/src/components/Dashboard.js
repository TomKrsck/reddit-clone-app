import React, { Component } from "react";
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component { 

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <p>You are logged in as {user.name}.</p>
                <Button
                    color="dark"
                    style={{marginTop:'2rem'}}
                    block
                    onClick={this.onLogoutClick}>Logout
                </Button>
            </div>
        )
    };
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps, { logoutUser })(Dashboard);