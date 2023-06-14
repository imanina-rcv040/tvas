const authProvider = {
    login: ({ username, password }) => {
        console.info("auth provide login");
        return Promise.resolve();
    },
    logout: () => {
        console.info("auth provide logout");
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkAuth: () => {
        console.info("auth provide check auth");
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        // localStorage.removeItem('password');
        console.log("local username", username)
        console.log("local password", password)
        if ((username !== 'demo' || password !== 'demo')
            && (username !== 'demo1' || password !== 'demo1')
            && (username !== 'demo2' || password !== 'demo2')
            && (username !== 'demo3' || password !== 'demo3')
        ) {
            return Promise.reject();
        }
        return Promise.resolve()
    },
    // localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () => {

        const username = localStorage.getItem('username');
        return Promise.resolve({
            id: 'user',
            fullName: username,
        })
    }
    ,
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;
