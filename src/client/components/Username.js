import React from 'react';
import {connect} from 'react-redux';

import {getUsername} from '../actions/general';

class Username extends React.Component {

    componentDidMount() {
        this.props.getUsername();
    }

    render() {
        const {username} = this.props;
        return (
            <h1>
                {username ? `Hello ${username}!` : `Loading...`}
            </h1>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.general.username
});

export default connect(mapStateToProps, {getUsername})(Username)