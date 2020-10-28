import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'signout':
            return { token: null , errorMessage:''};
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin , payload: token' });
        navigate('Home');
    } else {
        navigate('Signup');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
}

const signup = (dispatch) => async ({ email, password }) => {
    try {
        const res = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({ type: 'signin', payload: res.data.token });

        navigate('mainFlow');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong' })
    }
};

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const res = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', res.data.token);
            dispatch({ type: 'signin', payload: res.data.token });

            navigate('mainFlow');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' })
        }
    };
};

const signout = (dispatch) => async() => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });

    navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);