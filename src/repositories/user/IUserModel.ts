import * as mongoose from 'mongoose';
export default interface IUserModel extends mongoose.Document {
    id: string ;
    name: string ;
    address: string ;
    email: string ;
    role: string ;
    dob: Date ;
    mob: number;
    hobbies: string[] ;
}