import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Loading = ({ loading }) => (
    loading && (
        <div className="loading">
            <img className="loading-image" src={require('../../assets/images/loading.png')} alt="Loading" />
        </div>
    )
);

const mapStateToProps = state => ({
    loading: state.loading
});

Loading.propTypes = {
    loading: PropTypes.bool
};

export default connect(mapStateToProps)(Loading);