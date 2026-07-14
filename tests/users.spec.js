const {test, expect} = require('../fixtures');

//GET USER
const theUserCases = [
    {
        description:'get the user',
        theId : 2,
        expectedStatus:200,

    },{
        description:'get the user 404',
        theId: 100,
        expectedStatus:404
    }
]

for (const tasecase of theUserCases){
    test(`${tasecase.description}`, async ({userapi}) =>{
        const response  = await userapi.getUserLegacy(tasecase.theId)
        expect(response.status()).toBe(tasecase.expectedStatus);
        
        if(tasecase.expectedStatus === 200){
            const body = await response.json();
            expect(body.data.id).toBe(tasecase.theId);
            expect(body.data.email).toBeTruthy();
        }
    })
}

test('GET users page two ', async ({userapi}) =>{
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

const cases = [
    {
        description:'post login - success', 
        email :'eve.holt@reqres.in',
        password:'cityslicka',
        expectedStatus: 200
    },{
        description:'post login - Missing Password',
        email:'eve.holt@reqres.in',
        password:undefined,
        expectedStatus:400
    }
]
for(const taseCase of cases){
    test(`${taseCase.description}`, async ({authapi}) =>{
        const response = await authapi.login(
            taseCase.email,
            taseCase.password
        )
        expect(response.status()).toBe(taseCase.expectedStatus)
            if(taseCase.expectedStatus === 200){
                const body = await response.json();
                expect(body.token).toBeTruthy()
            }
    })
}

//CUSTOM COLLECTION

test('Get the collection user ', async ({userapi}) =>{
    const getUser = await userapi.getUser('2c43ea6c-c86c-44e7-a49f-63f84ef18348')
    expect(getUser.status()).toBe(200)
    const body = await getUser.json();
    expect(body.data.data.email).toBeTruthy();
    expect(body.data.data.first_name).toBeTruthy();
    expect(body.data.data.age).toBeTruthy();
})

let idUser; 

test('Post / create a new user', async ({userapi}) =>{
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

test('Put / edit the user after created', async ({userapi})=>{
    const updateUser = await userapi.updateUser(idUser,{
        email: 'editIri@gmail.com'
    }) 
    expect(updateUser.status()).toBe(200);
    const body = await updateUser.json();
    console.log(body.data.data.email);
    expect(body.data.data.email).toBe(`editIri@gmail.com`)
})

test('Delete the one user after created', async ({userapi}) =>{
    const deleteUser = await userapi.deleteUser(idUser)
    expect(deleteUser.status()).toBe(204)
})
