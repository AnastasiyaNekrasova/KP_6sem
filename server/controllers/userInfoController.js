import UserInfo from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const addPhotoToUser = async (req, res) => {
    // try {
        const { id } = req.params;
        console.log(req.body.image);
    
        let fileName = Date.now().toString() + req.body.image;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        req.body.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    
        let updatedUser = await UserInfo.findOne({ user: id });
    
        if (!updatedUser) {
          updatedUser = await UserInfo.create({ user: id, photo: fileName });
        } else {
          updatedUser = await UserInfo.findOneAndUpdate(
            { user: id },
            { photo: fileName },
            { new: true, upsert: true }
          );
        }
      res.json(updatedUser);
    // } catch (error) {
    //   res.json({ message: 'Something went wrong --addPhotoToUser--' });
    // }
  };