const { ObjectId } = require("mongodb");
const User = require("../models/userModel");

const cloudinary = require("cloudinary");

// Register 5 users
exports.registerUsers = async (i) => {
    console.log("registerUsers", i)
    let user = {
        username: "user" + i,
        email: "user" + i + "@gmail.com",
        password: "user" + i,
    }
    let myCloud ;
    try {
        myCloud = await cloudinary.v2.uploader.upload(`/home/aastha/highon/backend/imgs/user${i}.jpg`, {
            folder: "useravatars",
        });
    } catch (err) {
        console.log("cloudinary err 1", err, i)
        return;
    }
let newUser;
    try {
        newUser = await User.create({
            ...user,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });
    } catch (err) {
        console.log("err 2", err, i)
    }
};

exports.getUserDetails = async () => {
    // Gets details of user 1
    let userId = new ObjectId("64c6b57388a01f0f6243c544");
    try {
        const user = await User.findById(userId)
        return user;
    } catch (err) { 
        console.log(err) 
    }
};
