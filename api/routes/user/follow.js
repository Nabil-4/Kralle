const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

router.post('', isConnected, (req, res) => {
    const {userId, otherUserId} = req.body
    const f = "SELECT * FROM follow WHERE userId = ? AND follow = ?"
    db.query(f, [userId, otherUserId], (err, result) => {
        if(result[0]) {
            const d = "DELETE FROM follow WHERE userId = ? AND follow = ?"
            db.query(d, [userId, otherUserId], (err, result) => {
                res.status(200)
            })
        } else {
            const q = "INSERT INTO follow(userId, follow) VALUES(?, ?)"
            db.query(q, [userId, otherUserId], (err, result) => {
                res.status(200)
            })
        }
    })
})

router.get('/countFollower/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const q = "SELECT count(*) as nbrOfFollower FROM follow WHERE follow = ?"
    db.query(q, [userId], (err, result) => {
        res.status(200).json(result[0])
    })
})

router.get('/countFollow/:id', isConnected, (req, res) => {
    const userId = req.params.id
    const q = "SELECT count(*) as nbrOfFollow FROM follow WHERE userId = ?"
    db.query(q, [userId], (err, result) => {
        res.status(200).json(result[0])
    })
})

router.get('/:userId/:followId', isConnected, (req, res) => {
    const {userId, followId} = req.params
    const q = "SELECT * FROM follow WHERE userId = ? AND follow = ?"
    db.query(q, [userId, followId], (err, result) => {
        if(result[0] != undefined) {
            res.status(200).json(true) 
        } else {
            res.status(200).json(false)
        }  
    })
})

module.exports = router