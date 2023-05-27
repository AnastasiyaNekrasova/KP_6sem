import mongoose from 'mongoose'

const PlantSchema = new mongoose.Schema(
    {
        plantname: { type: String, required: true },
        descript: { type: String, required: true },
        imgUrl: { type: String, required: true },
        views: { type: Number, default: 0 },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true },
)
export default mongoose.model('Plant', PlantSchema)
