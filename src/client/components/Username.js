import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUsername } from '../actions/general';

class Username extends React.Component {

    componentDidMount() {
        this.props.getUsername();
    }

    render() {
        const {username, error} = this.props;
        return (
            <div>
                <h1>
                    {username ? `Hello ${username}!` : `Loading...`}
                </h1>
                <p className="error">{error}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.user.username,
    error: state.user.error
});

const mapDispatchToProps = {
    getUsername: getUsername,
};

Username.propTypes = {
    username: PropTypes.string,
    error: PropTypes.string,
    getUsername: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Username);
