const Post = require("../models/postModel");
const { getUserDetails } = require("../controllers/userController");

const cloudinary = require("cloudinary");

// req body: 
// {
//     "description":"This is a new post",
//     "vibetags":"food",
//     "peopletags":"aastha",
//     "location": "xyz",
//      "image":"pikachu.jpg"
// }

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

    // console.log("Post does not have an image")
    // res.status(404).json({
    //     message: "Post does not have an image",
    // })
    // return;


    // get post...
    // if(req.body.likedbyusers.length !== 0) {
    //     for(let i = 0 ; i < req.body.likedbyusers.length; i++) {
    //         let user = await User.findById(req.body.likedbyusers[i]).populate(
    //             // takes name & email from user's database
    //             "user",
    //             "username avatar"
    //           ); 
    //     }          
    // }
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

    //     const userDetails = getUserDetails();
    // console.log(userDetails)
    // getUserDetails()
    // .then((userDetails) => {
    //   // {
    //   //     avatar: {
    //   //       public_id: 'useravatars/yroxl7gjwfcyiebbfaj6',
    //   //       url: 'https://res.cloudinary.com/myfirstcloud/image/upload/v1690711205/useravatars/yroxl7gjwfcyiebbfaj6.jpg'
    //   //     },
    //   //     _id: new ObjectId("64c634a6b3c62236375e7205"),
    //   //     __v: 0,
    //   //     username: 'user1'
    //   //   }

    // })
    // .catch((error) => {
    //   // Handle errors
    // });


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

