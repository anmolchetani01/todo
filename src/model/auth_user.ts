import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IAuthUser {
    _id: mongoose.ObjectId;
	name: string;
	password: string;
	email: string;
	access_token: string;
	refresh_token: string;
	is_active: boolean;
	is_verified: boolean;
	is_deleted: boolean;
	is_logged_in: boolean;
	last_login_at: Date;
	created_at: Date;
	updated_at: Date;
	updated_by: mongoose.ObjectId;
	created_by: mongoose.ObjectId;
}

const authUserSchema = new mongoose.Schema<IAuthUser>({
	name: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		select: false,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
	},
	access_token: {
		type: String,
		select: false,
	},
	refresh_token: {
		type: String,
		select: false,
	},
	is_active: {
		type: Boolean,
		default: false,
	},
	is_verified: {
		type: Boolean,
		default: false,
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
	is_logged_in: {
		type: Boolean,
		default: false,
	},
	last_login_at: {
		type: Date,
		select: false,
	},
	created_at: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	updated_at: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'authuser',
		select: false,
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'authuser',
		select: false,
	},
})

authUserSchema.pre('save',async function(next){
    try{
        if(!this.password||!this.isModified('password'))
        {
            next();
            return;
        }
        const encryptedPassword = await hashPassword(this.password);
        console.log(`in auth_user in model encrypt password is ${encryptedPassword}`)
        this.password=encryptedPassword;
        next();
    }
    catch(error)
    {
        console.log(`error in auth_user in model is ${error}`);
        throw error;
    }
})
const hashPassword = async (password:string):Promise<any>=>{
	const salt=await bcrypt.genSalt(10);
	return await bcrypt.hash(password,salt)
}

export default mongoose.model<IAuthUser>('authuser',authUserSchema);