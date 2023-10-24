const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

router.post('', isConnected, (req, res) => {
    const {postId, userId} = req.body
    const p = "SELECT * FROM favoris WHERE postId = ? AND addBy = ?"
    db.query(p, [postId, userId], (err, result) =>  {
        if(result[0]) {
            const d = "DELETE FROM favoris WHERE postId = ? AND addBy = ?"
            db.query(d, [postId, userId], (err, result) => {
                res.status(200).json('Retirer des favoris')
            })
        } else {
            const q = "INSERT INTO favoris(postId, addBy) VALUES(?, ?)"
            db.query(q, [postId, userId], (err, result) => {
                res.status(200).json('Ajouter aux favoris')
            })
        }
    })
})

router.get('/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const q = "SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOfLike, nbrOfComment FROM favoris JOIN posts on favoris.postId = posts.id JOIN users on posts.postedBy = users.id WHERE addBy = ? ORDER BY createAt DESC"
    db.query(q, [userId], (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/:userId/:postId', isConnected, (req, res) => {
    const {userId, postId} = req.params
    const q = "SELECT * FROM favoris WHERE postId = ? AND addBy = ?"
    db.query(q, [postId, userId], (err, result) => {
        if(result[0] != undefined) {
            res.status(200).json(true) 
        } else {
            res.status(200).json(false)
        }  
    })
})

module.exports = router