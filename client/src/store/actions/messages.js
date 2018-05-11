import {apiCall} from '../../services/api';
import {addError} from './errors';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const fetchMessages = () => {
    return dispatch => {
        console.log("Fetching");
        return apiCall('get', '/api/messages')
            .then((res) => {
                dispatch(loadMessages(res))
                console.log('fetch 2');
            })
            .catch(err => {
                console.log('Bad Fetch');
                dispatch(addError(err.messages));
            });
    }
}