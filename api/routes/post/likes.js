const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

router.post('', isConnected, (req, res) => {
    const {postId, userId} = req.body
    const p = "SELECT * FROM likes WHERE postId = ? AND likedBy = ?"
    db.query(p, [postId, userId], (err, result) =>  {
        if(result[0]) {
            const l = "UPDATE posts SET nbrOfLike = nbrOfLike - 1 WHERE id = ?;"
            db.query(l, [postId], (err, result) => {
                const d = "DELETE FROM likes WHERE postId = ? AND likedBy = ?"
                db.query(d, [postId, userId], (err, result) => {
                    res.status(200).json('Vous ne liker plus ce post')
                })
            }) 
        } else {
            const l = "UPDATE posts SET nbrOfLike = nbrOfLike + 1 WHERE id = ?;"
            db.query(l, [postId], (err, result) => {
                const q = "INSERT INTO likes(postId, likedBy) VALUES(?, ?)"
                db.query(q, [postId, userId], (err, result) => {
                    res.status(200).json('Liker !')
                })
            })   
        }
    })
})

router.get('/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const q = "SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOfLike, nbrOfComment FROM likes JOIN posts on likes.postId = posts.id JOIN users on posts.postedBy = users.id WHERE likedBy = ? ORDER BY id ASC"
    db.query(q, [userId], (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/:userId/:postId', isConnected, (req, res) => {
    const {userId, postId} = req.params
    const q = "SELECT * FROM likes WHERE postId = ? AND likedBy = ?"
    db.query(q, [postId, userId], (err, result) => {
        const c = "SELECT count(*) AS nbrOfLike FROM likes WHERE postId = ?"
        db.query(c, [postId], (err, data) => {
            if(result[0] != undefined) {
                res.status(200).json({liked : true, nbrOfLike : data[0].nbrOfLike}) 
            } else {
                res.status(200).json({liked : false, nbrOfLike : data[0].nbrOfLike})
            }
        })   
    })
})


module.exports = router