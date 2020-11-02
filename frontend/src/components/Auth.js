import axios from 'axios';

let userInfo = {
  email: null,
  password: null
}

let myAuth = {
    authenticate: (email, password) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/signin',
            {
                auth: {
                email: email,
                password: password
                }
            })
            .then(result => {
                userInfo = {
                email: email,
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