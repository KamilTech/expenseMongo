import { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from 'axios';

const domain = "http://localhost:3000/"; // Development Domain

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const register = (Person) => {
    return () => {
        return axios.post(`${domain}authentication/register`, Person)
        .then(res => {
            return res.data;
        }).catch((error) => { 
            throw new Error('Whoops! Some error occured... :(');
        })
    }
}

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};