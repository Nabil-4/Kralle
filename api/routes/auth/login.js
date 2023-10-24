const db = require('../../config/connectDB.js')

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('', (req, res) => {
    const {usernameOrEmail} = req.body
    const q = "SELECT * FROM users WHERE username = ? OR email = ?"
    db.query(q, [usernameOrEmail, usernameOrEmail], (err, result) => {
        if(err) return res.status(500).json(err)
        if(!result.length) return res.status(404).json("User not found")

        const checkPassword = bcrypt.compareSync(req.body.password, result[0].password)
        if(!checkPassword) return res.status(404).json("Wrong password")

        const token = jwt.sign({id: result[0].id}, "secretkey")

        const {password, userCreateAt, userUpdateAt, ...user} = result[0]

        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(user)
    })
})


module.exports = router