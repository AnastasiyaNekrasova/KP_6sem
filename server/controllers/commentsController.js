import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import Plant from '../models/Plant.js'

export const createComment = async (req, res) => {
    try {
        const { relatedModel, relatedId, comment, uId } = req.body;

        if (!comment) {
            return res.json({ message: "Comment can't be empty!" });
        }
        const newComment = new Comment({ comment: comment });
        // Определение связанной модели и обновление соответствующего поля
        if (relatedModel === 'plants') {
            newComment.plant = relatedId;
        } else if (relatedModel === 'posts') {
            newComment.post = relatedId;
        }
        
        newComment.author = uId
        await newComment.save();

        // Обновление комментариев в соответствующей модели
        if (relatedModel === 'plants') {
            await Plant.findByIdAndUpdate(relatedId, {
                $push: { comments: newComment._id },
            });
        } else if (relatedModel === 'posts') {
            await Post.findByIdAndUpdate(relatedId, {
                $push: { comments: newComment._id },
            });
        }
        res.json(newComment);
    } catch (error) {
        res.json({ message: 'Something went wrong' });
    }
};
