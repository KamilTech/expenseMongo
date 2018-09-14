export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                token: action.token,
                username: action.username
            };
        case 'LOGOUT':
            return {};
        default: 
            return state;
    }
}