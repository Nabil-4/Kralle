const db = require('../../config/connectDB.js')
const isConnected = require('../../controlers/isConnected.js')

const express = require('express')

const router = express.Router()

router.get('/:name', isConnected, (req, res) => {
    const name = req.params.name
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [name], (err, result) => {
        const {password, userCreateAt, userUpdateAt, ...otherProfil} = result[0]
        res.status(200).json(otherProfil)
    })
})

module.exports = router