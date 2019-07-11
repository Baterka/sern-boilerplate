import axios from 'axios';
import {GET_USERNAME} from './types';

export const getUsername = () => dispatch => {
    axios.get('/api/v1/user')
        .then(res => {
            dispatch({
                type: GET_USERNAME,
                payload: res.data.data
            });
        })
        .catch(err => {
            console.log(err);
        });
};