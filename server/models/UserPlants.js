import mongoose from 'mongoose';

const UserPlantsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant',
    },
    watering: {
      type: Date,
      default: ''
    },
    interval: {
      type: Number,
      default: 0 
    },
  },
  { timestamps: true }
);


export default mongoose.model('UserPlants', UserPlantsSchema);