import { User } from "../models/user.model.js";

export const getAllUsers =  async()=>{
        const users = await User.find();
        console.log(users);
        return users;
      }
    