import React from 'react';
import { connect } from 'react-redux'
import ReactImage from '../assets/react.png';
import PropTypes from 'prop-types';

class Image extends React.Component {
    render() {
        const {loading} = this.props;
        return (
            <img src={ReactImage} className={'spin ' + (!loading ? 'paused' : '')} alt="react"/>
        )
    }
}

Image.propTypes = {
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    loading: state.user.loading
});

export default connect(mapStateToProps)(Image)
