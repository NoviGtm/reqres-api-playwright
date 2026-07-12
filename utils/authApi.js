class AuthApi{
    constructor(request){
        this.request = request;
    }
    async login(email,password){
        const response = await this.request.post(`login`,{
            data:{
                email,
                password
            }
        })
        return response;
    }
}

module.exports = {AuthApi};