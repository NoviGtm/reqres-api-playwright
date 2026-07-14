const { AuthApi } = require("./authApi");

class UserApi{
    constructor(request){
        this.request = request;
        this.collection = 'collections/user/records';
    }
    async getUserLegacy(id){
        const response = await this.request.get(`users/${id}`);
        return response;
    }

    async listUserLegacy(page){
        const response = await this.request.get(`users?page=${page}`);
        return response;
    }

    async getUser(id){
        const response = await this.request.get(`${this.collection}/${id}`)
        return response;
    }

    async postUser(age, job, email, last_name, first_name, project_id){
        const response = await this.request.post(`${this.collection}?project_id=${project_id}`,{
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
        return response;
    }

    async updateUser(id, data){
        const response = await this.request.put(`${this.collection}/${id}`,{
            data:{
                data
            }
        })
        return response;
    }
    
    async deleteUser(id){
        const response = await this.request.delete(`${this.collection}/${id}`)
        return response;
    }
}

module.exports = {UserApi}
