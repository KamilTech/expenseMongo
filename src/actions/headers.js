function headers() {
    const authToken = localStorage.getItem('token');
    
    return headers = {
        'Content-Type': 'application/json',
        'Authorization': authToken 
    }
};

export default headers;