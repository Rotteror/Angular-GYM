const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { getAllPost, createPost, getPostById, updatePost, deletePost, followPost, unfollowPost } = require('../services/post');
const parserError = require('../utils/errorParser');


router.get('/', async (req, res) => {
    const data = await getAllPost();
    res.json(data)
});

router.get('/:id', preload(), async (req, res) => {
    const item = req.data.toObject();
    item._ownerId = item.owner.toString();
    console.log(item)
    res.json(item)
});


router.post('/create', isAuth(), async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        length: req.body.length,
        bodyFocus: req.body.bodyFocus,
        averageDuration: req.body.averageDuration,
        daysPerWeek: req.body.daysPerWeek,
        owner: req.user._id,
    };
    try {
        const result = await createPost(data);
        res.status(201).json(result);

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message })
    }
});

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        length: req.body.length,
        bodyFocus: req.body.bodyFocus,
        averageDuration: req.body.averageDuration,
        daysPerWeek: req.body.daysPerWeek,
    };
    try {
        const result = await updatePost(req.data._id, updated);
        res.status(200).json(result);

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message })
    }
});

router.get('/delete/:id', isAuth(), preload(), isOwner(), async (req, res) => {

    try {
        await deletePost(req.params.id);
        res.status(200).json({ message: "Succesfully delete record" })

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.post('/follow', isAuth(), async (req, res) => {
    const userId = req.user._id;
    const postId = req.body.data.postId;

    try {
        const result = await followPost(userId, postId);
        res.status(200).json(result)
    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
})

router.post('/unfollow', isAuth(), async (req, res)=> {
    const userId = req.user._id;
    const postId = req.body.data.postId;

    try {
        const result = await unfollowPost(userId, postId);
        res.status(200).json(result)
    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
})



module.exports = router;