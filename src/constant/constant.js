//related to auth
let auth = {
    MISSING_SIGNUP_DETAILS: "password, username, email are compulsory please check again",
    HASSING_INCOMPLETE: "something went wrong while encrypting data",
    AUTH_FAIL: "authentication fail while login",
    TOKEN_FAILED: "token failed to generate",
    LOGIN_FAILED: "failed to login",
    FAILED_SIGNUP: "failed to signup"
};

//related to user

let user = {
    USER_CREATED: "user created sucessfully",
    USER_NOTCREATED: "user record is not created",
    USER_EXISTS: "user already exist with this email",
    USER_NOTEXISTS : "user not exists"
}

module.exports = {
    authdetail: auth,
    userdetail: user

}

