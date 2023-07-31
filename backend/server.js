const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const cloudinary = require("cloudinary");
const net = require("net");

// work around a node v20 bug: https://github.com/nodejs/node/issues/47822#issuecomment-1564708870
if (net.setDefaultAutoSelectFamily) {
    net.setDefaultAutoSelectFamily(false);
}

process.on("uncaughtexception", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
  
    process.exit(1);
  });

dotenv.config({ path: "./config/config.env" });

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
});
