import axios from "axios";
import { config } from '../configs.js'

const USER_SERVICE_URL = config.USER_SERVICE_URL
const OAUTH_GOOGLE_SERVICE_URL = config.OAUTH_GOOGLE_SERVICE_URL

export const apis = {
    submitSignup,
    submitLogin,
    getOauthInfoGoogle,
};

async function submitSignup(newUserEmail, newUserPassword) {
    console.log('Called signup API with params:', newUserEmail, newUserPassword);
    return await axios
    .post(USER_SERVICE_URL + "/api/users/signup", {
        email: newUserEmail,
        password: newUserPassword
    }).then((res)=>{
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        return err
    })
}

async function submitLogin(userEmail, userPassword) {
    console.log('Called login API with params:', userEmail, userPassword);
    return await axios
    .post(USER_SERVICE_URL + "/api/users/login", {
        email: userEmail,
        password: userPassword,
    }).then((res)=>{
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        return err
    })
}

async function getOauthInfoGoogle() {

    console.log('Getting information from Google\'s Oauth2');
    // window.open(OAUTH_GOOGLE_SERVICE_URL + "/auth/google")

    return await axios
    .get(OAUTH_GOOGLE_SERVICE_URL + "/auth/google")
    .then((res)=>{
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        return err
    })
}
