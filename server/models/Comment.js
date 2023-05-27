import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    },
    { timestamps: true },
)
export default mongoose.model('Comment', CommentSchema)
