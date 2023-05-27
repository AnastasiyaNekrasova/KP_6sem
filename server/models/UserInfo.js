import mongoose from 'mongoose'

const UserInfoSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        photo: { type: String },
        email: { type: String },
        home: { type: String }
    },
    { timestamps: true },
)
export default mongoose.model('UserInfo', UserInfoSchema)