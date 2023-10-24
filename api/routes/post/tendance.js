const db = require('../../config/connectDB.js')

const express = require('express')

const router = express.Router()

router.get('', (req, res) => {
    const q = "SELECT substring_index(substring_index(r.contain, ' ', n.n), ' ', -1) as word, count(*) as nbrPosts from posts r join (SELECT 1 n UNION SELECT 2) n on n.n <= length(contain) - length(replace(contain, ' ', '')) + 1 group by word HAVING LENGTH(word) >= 4 ORDER by nbrPosts DESC LIMIT 5"
    db.query(q, (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/mostliked', (req, res) => {
    const p = "SELECT username, profilPicture, posts.id, postId, contain, img, createAt, nbrOfLike, nbrOfComment FROM posts JOIN users ON posts.postedBy = users.id WHERE postId IS NULL ORDER BY nbrOfLike DESC LIMIT 10"
    db.query(p, (err, result) => {
        res.status(200).json(result)
    })
})

router.get('/:tendance', (req, res) => {
    const tendance = req.params.tendance
    const q = `SELECT username, profilPicture, posts.id, contain, img, createAt, nbrOfLike, nbrOfComment FROM posts JOIN users ON posts.postedBy = users.id WHERE contain LIKE '%${tendance}%' ORDER BY createAt DESC`
    db.query(q, [tendance], (err, result) => {
        res.status(200).json(result)
    })
})



module.exports = router