import axios from 'axios';

const domain = "http://localhost:3000/"; // Development Domain

export const login = (token, username) => ({
    type: 'LOGIN',
    token,
    username
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

export const loginMongo = (Person) => {
    return (dispatch) => {
        return axios.post(`${domain}authentication/login`, Person)
            .then(res => {
                if (res.data.success === true) {
                    setTimeout(() => {
                        dispatch(login(res.data.token, res.data.user.username));
                    }, 3000);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    return { success: res.data.success, message: res.data.message };
                } else {
                    return { success: res.data.success, message: res.data.message };
                }
            });
    }
}

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    };
};