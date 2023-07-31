const Post = require("../models/postModel");
const { getUserDetails } = require("../controllers/userController");
const fs = require('fs');
const cloudinary = require("cloudinary");
const path = require("path");

exports.createPost = async (req, res, next) => {
    const base64Image = req.body.image;
    const binaryImageData = Buffer.from(base64Image, 'base64');

    let tempFilePath = path.dirname("postController.js");
    tempFilePath += "/imgs/image.jpg"
    console.error('tempFilePath', tempFilePath);

    fs.writeFileSync(tempFilePath, binaryImageData);

    try {
        var myCloud = await cloudinary.v2.uploader.upload(tempFilePath, {
            folder: "posts",
            width: 150,
            crop: "scale",
        });

        fs.unlinkSync(tempFilePath);

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Something went wrong' });
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

    let post = {};
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

