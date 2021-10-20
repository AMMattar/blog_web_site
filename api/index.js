const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const UserRoute = require('./routes/users')
const postRoute = require('./routes/posts');
const catRoute = require('./routes/categories')
const multer = require('multer');
const path = require('path');

dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useCreateIndex: true,
}).then(console.log('connected to MongoDB')).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, res, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file", (req, res) => {
    res.status(200).json("File has been Uploaded")
}))

app.use("/api/auth", authRoute)
app.use("/api/users", UserRoute)
app.use("/api/posts", postRoute)
app.use("/api/cat", catRoute)

app.listen('5000', () => {
    console.log(`server is running at port 5000 ...`)
})