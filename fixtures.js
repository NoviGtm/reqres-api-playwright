const {AuthApi} = require('./utils/authApi');
const {UserApi} = require('./utils/usersApi');
const base = require('@playwright/test')

const test = base.test.extend({
    authapi: async ({request}, use) =>{
        const apiAuth = new AuthApi(request);
        await use(apiAuth);
    },
    userapi: async ({request}, use) =>{
        const apiUser = new UserApi(request);
        await use(apiUser);
    }
})

module.exports = {test, expect: base.expect};