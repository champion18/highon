const Post = require("../models/postModel");
const { getUserDetails } = require("../controllers/userController");

const cloudinary = require("cloudinary");

exports.createPost = async (req, res, next) => {
    let image = `/home/aastha/highon/backend/imgs/user4.jpg`

    let myCloud;
    try {
        myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "posts",
            width: 150,
            crop: "scale",
        });
    } catch (err) {
        console.log("cloudinary err 1", err, i)
        return;
    }

    let userDetails = {};
    try {
        userDetails = await getUserDetails();
    } catch (err) {
        console.log("error fetching user details")
        res.status(404).json({
            message: "error fetching user details",
        })
        return;
    }

    let post={};
    try {
        post = await Post.create({
            ...req.body,
            author: userDetails,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });
    } catch (err) {
        console.log("err 2", err, i)
    }
    res.status(200).json({
        message: "Post uploaded successfully",
        post
    })
}

exports.getAllPosts = async (req, res, next) => {
    const posts = await Post.find();
    if (!posts) {
        let msg = "no posts found"
        res.status(200).json({
            msg,
            posts,
        });
        return;
    }

    res.status(200).json({
        posts,
    });
};

exports.getPost = async (req, res, next) => {
    res.status(200).json({
        message: "working",
    });
};

