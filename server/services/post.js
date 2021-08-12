const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

async function getAllPost() {
    return await Post.find({}).populate('owner').lean();
}

async function getPostById(id) {
    return await Post.findById(id).populate('owner').populate({
        path: 'comments',
        populate: { path: 'author' },
    });
}

async function createPost(data) {
    const result = new Post(data);
    await result.save();
    return result;
}

async function updatePost(id, updated) {
    const original = await Post.findById(id);
    Object.assign(original, updated);
    return original.save();
}

async function deletePost(id) {
    const post = await Post.findById(id);
    if (!post) {
        throw new Error('Invalid Program Post');
    }
    return post.delete();
}

async function getPostsByUserId(id) {
    const post = await Post.find({ owner: id })
    return post
}

async function followPost(userId, postId) {
    const user = await User.findById(userId) //.populate('programs'); 
    const post = await Post.findById(postId) //.populate('user'); 

    if (!user) {
        throw new Error('Invalid user')
    }
    if (!post) {
        throw new Error('Invalid post');
    }
    const userAlreadyFollowing = user.programs.indexOf(postId) //user.programs.find(p => p._id == postId);

    if (userAlreadyFollowing != -1) {
        throw new Error('You already follow this program');
    }

    if (userId == post.owner._id) {
        throw new Error('You are owner, cannot follow this program ')
    }

    user.programs.push(post);
    post.followers.push(user);

    // return Promise.all([(
    //     user.save(),
    //     post.save())
    // ]);
    user.save();
    post.save();
    return post;
};

async function unfollowPost(userId, postId) {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
        throw new Error('Invalid user')
    }
    if (!post) {
        throw new Error('Invalid post');
    }

    const idIndex = post.followers.indexOf(userId);
    const postIndex = user.programs.indexOf(postId);

    if (postIndex == -1 || idIndex == -1) {
        throw new Error('Current user is not a follower or current program dont include current user !');
    }

    post.followers.splice(idIndex, 1);
    user.programs.splice(postIndex, 1);

    // return Promise.all([(
    //     user.save(),
    //     post.save())
    // ]);
    post.save();
    user.save();
    return post;

}

async function createComment(postId, comment) {
    const post = await Post.findById(postId).populate('comments').populate({
        path: 'comments',
        populate: { path: 'author' },
    });

    if (!post) {
        throw new Error('Invalid program reference !');
    }
    const newComment = new Comment(comment);
    await newComment.save();

    post.comments.push(newComment);
    await post.save();
    return post;
}

async function deleteComment(commentId, postId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error('Invalid Comment !');
    }
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Invlaid post !')
    }
    const indexComment = post.comments.indexOf(commentId);
    if(indexComment == -1){
        throw new Error('No comments to delete or incorrect post ID !')
    }
    post.comments.splice(indexComment, 1);
    post.save();
    return comment.delete();

}


module.exports = {
    getAllPost,
    getPostById,
    updatePost,
    createPost,
    createComment,
    followPost,
    unfollowPost,
    deletePost,
    getPostsByUserId,
    deleteComment,
}