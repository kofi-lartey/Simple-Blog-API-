import { Post } from "../models/post-model.js"
import { postSchema } from "../schema/postSchema.js"

// creating a new post
export const post = async (req, res) => {
    try {
        // validate
        const { error, value } = postSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        // create a post
        const postData = await Post.create(value)
        console.log('postData', postData)

        // returning a succes with title and content only
        const { title, content } = postData
        return res.status(201).json({
            message: ' The newly created post object',
            postData: { title, content }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const allPost = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({ message: ' Array of post objects', posts })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const aPost = async (req, res) => {
    try {
        const postID = req.params.id;
        if (!postID) {
            return res.status(401).json({ message: 'Wrong ID' })
        }
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(401).json({ message: 'Post doesnt exist' })
        }
        return res.status(200).json({ message: ' Single post object', post })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postID = req.params.id;
        const userID = req.user.id;
        // verify the id inwhich we want to udate
        if (!postID) {
            return res.status(401).json({ message: 'Wrong ID' })
        }
        // find the post using the id
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' })
        }
        // compare the user(id) in the postModel to that of the userid in the token
        if (post.user.toString() !== userID.toString()) {
            return res.status(403).json({ message: 'you are not authorize to Edit this post' })
        }
        // update the existing body with this new ones
        const postUpdate = await Post.findByIdAndUpdate(
            {_id: postID, user: userID},
            req.body,
            {new: true}
        );
        return res.status(200).json({ message: 'The updated post object', postUpdate })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const delPost = async (req, res) => {
    try {
        const postID = req.params.id;
        const userID = req.user.id;
        // verify the id inwhich we want to udate
        if (!postID) {
            return res.status(401).json({ message: 'Wrong ID' })
        }
        // find the post using the id
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' })
        }
        // compare the user(id) in the postModel to that of the userid in the token
        if (post.user.toString() !== userID.toString()) {
            return res.status(403).json({ message: 'you are not authorize to Edit this post' })
        }
        // update the existing body with this new ones
        await Post.findByIdAndDelete(postID);
        return res.status(200).json({ message: 'Post deleted successfully', post})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

