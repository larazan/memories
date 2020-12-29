const PostMessage = require('../models/postMessage');


exports.getPosts = async (req, res) => {
    res.send('this works!');
    console.log('tes sukses!');
    
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.createPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(post);

    // res.send('post creation');

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatePost);
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

exports.likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}