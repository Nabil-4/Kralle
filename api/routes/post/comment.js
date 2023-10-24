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

router.post('', isConnected, uploads.single('commentImage'), (req, res) => {
    const commentImage = req.file
    const {postId, comment, postedBy} = req.body
    const p = "INSERT INTO posts(postId, contain, img, postedBy, createAt) VALUES(?, ?, ?, ?, NOW())"
    if(commentImage) {
        db.query(p, [postId, comment, commentImage.filename, postedBy], (err, result) => {
            const c = "UPDATE posts SET nbrOfComment = nbrOfComment + 1 WHERE id = ?"
            db.query(c, [postId], (err, result) => {
               res.status(200).json('Commenter !') 
            }) 
        })
    } else {
        db.query(p, [postId, comment, "", postedBy], (err, result) => {
            const c = "UPDATE posts SET nbrOfComment = nbrOfComment + 1 WHERE id = ?"
            db.query(c, [postId], (err, result) => {
               res.status(200).json('Commenter !') 
            }) 
        })
    }
})

router.get('/:id', isConnected, (req, res) => {
    const id = req.params.id
    const q = "SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOflike, nbrOfComment FROM posts JOIN users ON posts.postedby = users.id WHERE postId = ?"
    db.query(q, [id], (err, result) => {
        res.status(200).json(result)
    })
})


module.exports = router