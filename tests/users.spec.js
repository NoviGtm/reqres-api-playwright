const {test, expect, request} = require('@playwright/test');
const {AuthApi} = require('../utils/authApi');
const {UserApi} = require('../utils/usersApi');

test('get the user', async ({request}) =>{
    const userapi = new UserApi(request);
    const userLegacy = await userapi.getUserLegacy(2)
    expect(userLegacy.status()).toBe(200)
    const body = await userLegacy.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeTruthy();
})

test('GET users page two ', async ({request}) =>{
    const userapi = new UserApi(request);
    const listUser = await userapi.listUserLegacy(2)
    expect(listUser.status()).toBe(200);
    const body = await listUser.json();
    expect(body.page).toBeTruthy();
    expect(body.page).toBe(2);
    expect(body.total_pages).toBeTruthy();
    expect(body.data).toBeTruthy();
    expect(body.data.length).toBe(6)
})

//LOGIN AUTH 

test('post login - success', async ({request}) =>{
    const authApi = new AuthApi(request);
    const login = await authApi.login(
        "eve.holt@reqres.in",
        "cityslicka"
    )
    expect(login.status()).toBe(200)
    const body = await login.json();
    expect(body.token).toBeTruthy()
})

test('post login - Missing Password', async ({request}) =>{
    const authApi = new AuthApi(request)
    const missing = await authApi.login(
        "eve.holt@reqres.in",
    )
    expect(missing.status()).toBe(400)
    const body = await missing.json()
    expect(body.error).toBeTruthy();
})

//CUSTOM COLLECTION

test('Get the collection user ', async ({request}) =>{
    const userapi = new UserApi(request);
    const getUser = await userapi.getUser('2c43ea6c-c86c-44e7-a49f-63f84ef18348')
    expect(getUser.status()).toBe(200)
    const body = await getUser.json();
    expect(body.data.data.email).toBeTruthy();
    expect(body.data.data.first_name).toBeTruthy();
    expect(body.data.data.age).toBeTruthy();
})

let idUser; 

test('Post / create a new user', async ({request}) =>{
    const userapi = new UserApi(request);
    const newUser = await userapi.postUser(
         30,
        'software Developer', 
        'iri@gmail.com', 
        'G', 
        'Iri', 
        35043
    )
    expect(newUser.status()).toBe(201)
    const body = await newUser.json();
    idUser = body.data.id;
    expect(body.data.created_at).toBeTruthy();
    expect(body.data.created_by).toBeTruthy();
    expect(body.data.data.age).toBe(30);
    expect(body.data.data.email).toBeTruthy();
    expect(body.data.data.email).toBe('iri@gmail.com');
    expect(body.data.data.first_name).toBeTruthy();
    expect(body.data.data.first_name).toBe('Iri');
})

test('Put / edit the user after created', async ({request})=>{
    const userapi = new UserApi(request)
    const updateUser = await userapi.updateUser(idUser,{
        email: 'editIri@gmail.com'
    }) 
    expect(updateUser.status()).toBe(200);
    const body = await updateUser.json();
    console.log(body.data.data.email);
    expect(body.data.data.email).toBe(`editIri@gmail.com`)
})

test('Delete the one user after created', async ({request}) =>{
    const userapi = new UserApi(request)
    const deleteUser = await userapi.deleteUser(idUser)
    expect(deleteUser.status()).toBe(204)
})
