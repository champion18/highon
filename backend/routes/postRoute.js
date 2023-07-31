const express = require("express");
const {createPost, getAllPosts, getPost} = require("../controllers/postController");

const router = express.Router();

router.route("/post/create").post(createPost);
router.route("/post/all").get(getAllPosts);
router.route("/post/aastha").get(getPost);


module.exports = router;