import axios from "axios";


 class UserService{

  getUser=()=>{
     return axios.get(`https://randomuser.me/api/`)
    }
  
}

export default new UserService