const {test, expect, request} = require('@playwright/test');

//ReqRes's original
test('get the user', async ({request}) =>{
    const response = await request.get('users/2')
    expect(response.status()).toBe(200);
    const theBody = await response.json();
    expect(theBody.data.id).toBe(2)
    expect(theBody.data.email).toBeTruthy();
})

test('GET users page two ', async ({request}) =>{
    const response = await request.get('users?page=2');
    expect(response.status()).toBe(200)
    const thebody  = await response.json()
    expect(thebody.page).toBeTruthy();
    expect(thebody.page).toBe(2)
    expect(thebody.total_pages).toBeTruthy();
    expect(thebody.data).toBeTruthy()
    expect(thebody.data.length).toBe(6)
})

test('post login - success', async ({request}) =>{
    const response = await request.post(`login`,{
        data:{
            email:"eve.holt@reqres.in",
            password:"cityslicka"
        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.token).toBeTruthy()
})

test('post login - Missing Password', async ({request}) =>{
    const response = await request.post(`login`,{
        data:{
            email:"eve.holt@reqres.in",
        }
    })
    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body.error).toBeTruthy();
})

//CUSTOM COLLECTION
async function getUser(request,id){
    const res = await request.get(`collections/user/records/${id}`)
    expect(res.status()).toBe(200)
    return res.json();
}

async function postUser(request, age, job, email, last_name, first_name, project_id){
    const res = await request.post(`collections/user/records?project_id=${project_id}`,{
        data:{
            data:{
                age, 
                job, 
                email, 
                last_name, 
                first_name, 
                project_id
            }
        }
    })
    expect(res.status()).toBe(201)
    return res.json();
}

async function updateUser(request, id, data){
    const res = await request.put(`collections/user/records/${id}`,
        {data:
            {data}
        }
    )
    expect(res.status()).toBe(200);
    return res.json();
}

async function deleteUser(request, id){
    const res = await request.delete(`collections/user/records/${id}`);
    expect(res.status()).toBe(204);
}

test('Get the one User use reusable helper', async ({request}) =>{
    const getOneUser = await getUser(request, '2c43ea6c-c86c-44e7-a49f-63f84ef18348');
})
let idUser; 

test('Post the New user', async ({request}) =>{
    const postOneUser = await postUser(
        request,
         30,
        'software Developer', 
        'iri@gmail.com', 
        'G', 
        'Iri', 
        35043
    )
    console.log(`created todo ID: ${postOneUser.data.id}`);
    idUser = postOneUser.data.id
    expect(postOneUser.data.created_by).toBeTruthy();
    expect(postOneUser.data.created_at).toBeTruthy();
    expect(postOneUser.data.data.age).toBe(30);
    expect(postOneUser.data.data.email).toBeTruthy();
    expect(postOneUser.data.data.email).toBe('iri@gmail.com');
    expect(postOneUser.data.data.first_name).toBeTruthy();
    expect(postOneUser.data.data.first_name).toBe('Iri');
    
})

test('edit the user after created', async ({request})=>{
    const update = await updateUser(request, `${idUser}`,{
         email: 'editIri@gmail.com'
    })
    console.log("update email---------:",update.data.data.email)
    expect(update.data.data.email).toBe('editIri@gmail.com')
})

test('Delete the one user after created', async ({request}) =>{
    console.log(`idUser at delete time`, idUser)
    await deleteUser(request,`${idUser}`)
})
