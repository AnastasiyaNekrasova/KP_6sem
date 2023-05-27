import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({ message: 'Something went wrong( --createPost--' })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if (!posts) {
            return res.json({ message: 'There are no posts yet\nBe the first! Share information with others!' })
        }

        res.json({ posts, popularPosts })
    } catch (error) {
        res.json({ message: 'Something went wrong( --getAllPosts--' })
    }
}

// Get Post By Id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        res.json(post)
    } catch (error) {
        res.json({ message: 'Something went wrong( --getPostById--' })
    }
}

// Get User Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const userPosts = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        const filteredUserPosts = userPosts.filter((post) => post !== null);
        const sortedUserPosts = filteredUserPosts.sort((a, b) => b.createdAt - a.createdAt);
        
        res.json({userPosts: sortedUserPosts})
    } catch (error) {
        res.json({ message: 'Something went wrong( --getMyPosts--' })
    }
}

// Remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'There is no such post' })
        
        await Comment.deleteMany({ _id: { $in: post.comments } }); // Удаление комментариев

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        })

        res.json({ message: 'Post was deleted', _id:req.params.id })
    } catch (error) {
        res.json({ message: 'Something went wrong( --removePost--' })
    }
}

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        res.json(post)
    } catch (error) {
        res.json({ message: 'Something went wrong( --updatePost--' })
    }
}

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map(async (comment) => {
              const commentData = await Comment.findById(comment.toString());
              const user = await User.findById(commentData.author);
              const username = user.username
              return { ...commentData.toJSON(), username };
            })
          );
        res.json(list)
    } catch (error) {
        res.json({ message: 'Something went wrong( --getPostComments--' })
    }

}
