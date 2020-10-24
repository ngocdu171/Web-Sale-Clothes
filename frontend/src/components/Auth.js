import axios from 'axios';

let userInfo = {
  username: null,
  password: null
}

let myAuth = {
    authenticate: (username, password) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:4000/signin',
            {
                auth: {
                username: username,
                password: password
                }
            })
            .then(result => {
                userInfo = {
                username: username,
                password: password
                }
                resolve(result);
            })
            .catch(error =>
                {
                console.log(error);
                reject();
                }
            )
        });
    },
    getAxiosAuth: () => {
      return {
        auth: userInfo
      }
    }
}

export default myAuth;