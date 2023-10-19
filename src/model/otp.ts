import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'auth_user',
	},
	otp: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
		select: false,
		expires: '24h',
	},
});

export default mongoose.model('otp', otpSchema);
