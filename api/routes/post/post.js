const multer = require('multer')
const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads/posts')
    },
    filename : (req, file, cb) => {
        cb(null, `${file.originalname}.${file.mimetype.split('/').pop()}`)
    }
})

const uploads = multer({storage : storage})

router.post('', isConnected, uploads.single('postImage'), (req, res) => {
    const postImage = req.file
    const {post, postedBy} = req.body
    const p = "INSERT INTO posts(contain, img, postedBy, createAt) VALUES(?, ?, ?, NOW())"
    if(postImage) {
        db.query(p, [post, postImage.filename, postedBy], (err, result) => {
            res.status(200).json('Post creer')
        })
    } else {
        db.query(p, [post, "", postedBy], (err, result) => {
            res.status(200).json('Post creer')
        })
    }
})

router.get('/follow/:id', isConnected, (req, res) => {
    const userId = req.params.id
        const p = "SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOfComment FROM posts JOIN users ON posts.postedBy = users.id JOIN follow ON follow.userId = ? WHERE postedBy = ? OR postedBy = follow.follow AND postId IS NULL GROUP BY posts.id ORDER BY createAt DESC"
        db.query(p, [userId, userId], (err, result) => {
            res.status(200).json(result)
        })
})

router.get('/recomendation', isConnected, (req, res) => {
    const p = "SELECT username, profilPicture, posts.id, postId, contain, img, createAt, nbrOfComment FROM posts JOIN users ON posts.postedBy = users.id WHERE postId IS NULL ORDER BY createAt DESC"
    db.query(p, (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const p = "SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOfComment FROM posts JOIN users ON posts.postedBy = users.id WHERE postedBy = ? AND postId IS NULL ORDER BY createAt DESC"
    db.query(p, [userId], (err, result) => {
        res.status(200).json(result)
    })
})

module.exports = router