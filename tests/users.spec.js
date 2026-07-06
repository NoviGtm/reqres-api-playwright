const {test, expect} = require('@playwright/test');

test('get the user', async ({request}) =>{
    const response = await request.get('users/2')
    expect(response.status()).toBe(200);
    const theBody = await response.json();
    console.log(theBody)
    expect(theBody.data.id).toBe(2)
    expect(theBody.data.email).toBeTruthy();
    // expect(theBody)
})